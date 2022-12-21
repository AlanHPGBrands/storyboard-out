rem Applies a series of distortions,
rem   using "jump" method to find the best improvement.
rem %1 input image
rem %2 output image
rem %3 first number
rem %4 last number
rem %5 IM command, with _XX_, which will be substituted.
rem      For example: "-colors _XX_"
rem %6 optional template for gnuplot graph images, with _XX_
@rem
@rem Also uses:
@rem   jmPdims [3] Smaller values give more weight to jumps at high distortions.
@rem
@rem See https://en.wikipedia.org/wiki/Determining_the_number_of_clusters_in_a_data_set

@if "%~5"=="" findstr /B "rem @rem" %~f0 & exit /B 1

@setlocal

@call echoOffSave

call %PICTBAT%setInOut %1 jm


set INFILE=%1
set OUTFILE=%2

set nStart=%3
set nEnd=%4

set CMD=%~5

set TMPLT=%6
if "%TMPLT%"=="." set TMPLT=

set TMPLT_SVG=%~dpn6.svg

set TMPDIR=\temp\

set GPDATA1=%TMPDIR%jm_gp1.csv
set GPDATA2=%TMPDIR%jm_gp2.csv
set GPDATA3=%TMPDIR%jm_gp3.csv
set GPDATA4=%TMPDIR%jm_gp4.csv
set GPDATA5=%TMPDIR%jm_gp5.csv

set GPSVG1=%TMPLT_SVG:_XX_=1%
set GPSVG2=%TMPLT_SVG:_XX_=2%
set GPSVG3=%TMPLT_SVG:_XX_=3%
set GPSVG4=%TMPLT_SVG:_XX_=4%
set GPSVG5=%TMPLT_SVG:_XX_=5%

echo i,v >%GPDATA1%
echo i,v >%GPDATA2%
echo i,v >%GPDATA3%
echo i,v >%GPDATA4%
echo i,v >%GPDATA5%

if "%jmPdims%"=="" set jmPdims=3
set Y=%jmPdims%/2

set DPREV=0
set maxJ=0
set NatMax=0

if %nStart% LEQ %nEnd% (
  set nStep=1
) else (
  set nStep=-1
)

if %nStart%==1 (
  set ignoreThis=0
) else (
  set ignoreThis=1
  set /A nStart-=%nStep%
)

echo nStart=%nStart% ignoreThis=%ignoreThis%

for /L %%N in (%nStart%,%nStep%,%nEnd%) do (

  set sCMD=!CMD:_XX_=%%N!
  echo sCMD=!sCMD!

  for /F "usebackq" %%L in (`%IMDEV%convert ^
    %INFILE% ^
    ^( +clone ^
       !sCMD! ^
    ^) ^
    -metric RMSE ^
    -precision 19 ^
    -format %%[distortion] ^
    -compare ^
    info:`) do set DIST=%%L

rem FIXME: Beware DIST=0

  for /F "usebackq" %%L in (`%IM%identify ^
    -precision 19 ^
    -format "D=%%[fx:pow(!DIST!,-(%Y%))]\n" ^
    xc:`) do set %%L

  for /F "usebackq" %%L in (`%IM%identify ^
    -precision 19 ^
    -format "J=%%[fx:!D!-!DPREV!]\nBPB=%%[fx:!D!/%%N]\n" ^
    xc:`) do set %%L

  for /F "usebackq" %%L in (`%IM%identify ^
    -format "isMax=%%[fx:!J!>!maxJ!?1:0]" ^
    xc:`) do set %%L

  if !ignoreThis!==0 (
    if !isMax!==1 (
      set maxJ=!J!
      set NatMax=%%N
      echo %%N,!j! >>%GPDATA4%
    )
    if not "%TMPLT%"=="" (
      echo %%N,!DIST! >>%GPDATA1%
      echo %%N,!D! >>%GPDATA2%
      echo %%N,!j! >>%GPDATA3%
      echo %%N,!BPB! >>%GPDATA5%
    )
  )
  echo %%N, DIST=!DIST!  D=!D! J=!J!  BPB=!BPB!  isMax=!isMax!

  set DPREV=!D!

  set ignoreThis=0
)

echo maxJ=%maxJ%  NatMax=%NatMax%

set sCMD=!CMD:_XX_=%NatMax%!
echo sCMD=!sCMD!

%IMDEV%convert ^
  %INFILE% ^
  !sCMD! ^
  %OUTFILE%

if "%TMPLT%"=="" goto end

gnuplot ^
  -c %PICTBAT%plotScr.gp ^
  %GPDATA1% %GPSVG1% 450 400 "2" ^
  "N" "distortion" ^
  "set key off"

gnuplot ^
  -c %PICTBAT%plotScr.gp ^
  %GPDATA2% %GPSVG2% 450 400 "2" ^
  "N" "D" ^
  "set key off"

gnuplot ^
  -c %PICTBAT%plotScr.gp ^
  %GPDATA3% %GPSVG3% 450 400 "2" ^
  "N" "J" ^
  "set key off"

gnuplot ^
  -c %PICTBAT%plotScr.gp ^
  %GPDATA4% %GPSVG4% 450 400 "2" ^
  "N" "best J so far" ^
  "set key off"

gnuplot ^
  -c %PICTBAT%plotScr.gp ^
  %GPDATA5% %GPSVG5% 450 400 "2" ^
  "N" "BPB" ^
  "set key off"

set GR1=%TMPLT:_XX_=1%
set GR2=%TMPLT:_XX_=2%
set GR3=%TMPLT:_XX_=3%
set GR4=%TMPLT:_XX_=4%
set GR5=%TMPLT:_XX_=5%
set GRALL=%TMPLT:_XX_=all%

call %PICTBAT%gpTrimY %GPSVG1% %GR1%
call %PICTBAT%gpTrimY %GPSVG2% %GR2%
call %PICTBAT%gpTrimY %GPSVG3% %GR3%
call %PICTBAT%gpTrimY %GPSVG4% %GR4%
call %PICTBAT%gpTrimY %GPSVG5% %GR5%

%IM%convert  %GR1% %GR2% %GR3% +append +repage %GRALL%

:end

call echoRestore

endlocal &set jmOUTFILE=%OUTFILE%& set jmNatMax=%NatMax%