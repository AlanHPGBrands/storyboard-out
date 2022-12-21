/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getIdEmail = /* GraphQL */ `
  query GetIdEmail($id: ID!) {
    getIdEmail(id: $id) {
      id
      email
      resultid
      createdAt
      updatedAt
    }
  }
`;
export const listIdEmails = /* GraphQL */ `
  query ListIdEmails(
    $filter: ModelIdEmailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIdEmails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        resultid
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProIdEmail = /* GraphQL */ `
  query GetProIdEmail($id: ID!) {
    getProIdEmail(id: $id) {
      id
      email
      resultid
      createdAt
      updatedAt
    }
  }
`;
export const listProIdEmails = /* GraphQL */ `
  query ListProIdEmails(
    $filter: ModelProIdEmailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProIdEmails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        resultid
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getIdFinLocation = /* GraphQL */ `
  query GetIdFinLocation($id: ID!) {
    getIdFinLocation(id: $id) {
      id
      finals_location
      resultid
      createdAt
      updatedAt
    }
  }
`;
export const listIdFinLocations = /* GraphQL */ `
  query ListIdFinLocations(
    $filter: ModelIdFinLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIdFinLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        finals_location
        resultid
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getImageBrandObject = /* GraphQL */ `
  query GetImageBrandObject($id: ID!) {
    getImageBrandObject(id: $id) {
      id
      email
      resultid
      img_orig_filename
      brand
      img_cloud_url
      img_cloud_url_o
      input_name
      phone
      processedFile
      createdAt
      updatedAt
    }
  }
`;
export const listImageBrandObjects = /* GraphQL */ `
  query ListImageBrandObjects(
    $filter: ModelImageBrandObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImageBrandObjects(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        resultid
        img_orig_filename
        brand
        img_cloud_url
        img_cloud_url_o
        input_name
        phone
        processedFile
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getImageBrandObjectBackup2 = /* GraphQL */ `
  query GetImageBrandObjectBackup2($id: ID!) {
    getImageBrandObjectBackup2(id: $id) {
      id
      email
      resultid
      img_orig_filename
      brand
      img_cloud_url
      img_cloud_url_o
      input_name
      phone
      processedFile
      createdAt
      createdAt2Ms
      processingFile
      updatedAt
    }
  }
`;
export const listImageBrandObjectBackup2s = /* GraphQL */ `
  query ListImageBrandObjectBackup2s(
    $filter: ModelImageBrandObjectBackup2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImageBrandObjectBackup2s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        resultid
        img_orig_filename
        brand
        img_cloud_url
        img_cloud_url_o
        input_name
        phone
        processedFile
        createdAt
        createdAt2Ms
        processingFile
        updatedAt
      }
      nextToken
    }
  }
`;
export const getInkLogo = /* GraphQL */ `
  query GetInkLogo($id: ID!) {
    getInkLogo(id: $id) {
      id
      createdAt
      created_at_flt
      processing_file
      processed_file
      proc_at
      proc_by
      email
      email2
      input_name
      result_id
      brand
      category
      brands
      phone
      user_name
      img_orig_filename
      img_cloud_url_o
      logo_named
      logo_name
      tesseract
      updatedAt
    }
  }
`;
export const listInkLogos = /* GraphQL */ `
  query ListInkLogos(
    $filter: ModelinkLogoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInkLogos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEarlyStuffs2 = /* GraphQL */ `
  query GetEarlyStuffs2($id: ID!) {
    getEarlyStuffs2(id: $id) {
      id
      createdAt
      created_at_flt
      processing_file
      processed_file
      proc_at
      proc_by
      email
      email2
      input_name
      result_id
      brand
      category
      brands
      phone
      user_name
      img_orig_filename
      img_cloud_url_o
      logo_named
      logo_name
      tesseract
      square_svg_url
      unsquare_svg_url
      palette
      pop_color
      static
      ink_logo {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listEarlyStuffs2s = /* GraphQL */ `
  query ListEarlyStuffs2s(
    $filter: ModelearlyStuffs2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEarlyStuffs2s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        square_svg_url
        unsquare_svg_url
        palette
        pop_color
        static
        ink_logo {
          id
          createdAt
          created_at_flt
          processing_file
          processed_file
          proc_at
          proc_by
          email
          email2
          input_name
          result_id
          brand
          category
          brands
          phone
          user_name
          img_orig_filename
          img_cloud_url_o
          logo_named
          logo_name
          tesseract
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNamedLogo = /* GraphQL */ `
  query GetNamedLogo($id: ID!) {
    getNamedLogo(id: $id) {
      id
      createdAt
      created_at_flt
      email
      input_name
      result_id
      user_name
      img_orig_filename
      img_cloud_url_o
      img_cloud_url
      named
      misc_0
      misc_1
      misc_2
      updatedAt
    }
  }
`;
export const listNamedLogos = /* GraphQL */ `
  query ListNamedLogos(
    $filter: ModelnamedLogoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNamedLogos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        created_at_flt
        email
        input_name
        result_id
        user_name
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        named
        misc_0
        misc_1
        misc_2
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNamed = /* GraphQL */ `
  query GetNamed($id: ID!) {
    getNamed(id: $id) {
      id
      createdAt
      created_at_flt
      named
      email
      input_name
      result_id
      user_name
      created_at_flt_day
      img_orig_filename
      img_cloud_url_o
      img_cloud_url
      misc_0
      misc_1
      misc_2
      vectorized
      email_sent
      static
      processed
      processing
      updatedAt
    }
  }
`;
export const listNameds = /* GraphQL */ `
  query ListNameds(
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNameds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSvgObjectsArray = /* GraphQL */ `
  query GetSvgObjectsArray($id: ID!) {
    getSvgObjectsArray(id: $id) {
      id
      data
      result_id
      logo_url
      email
      logotype
      createdAt
      updatedAt
    }
  }
`;
export const listSvgObjectsArrays = /* GraphQL */ `
  query ListSvgObjectsArrays(
    $filter: ModelSvgObjectsArrayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSvgObjectsArrays(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        data
        result_id
        logo_url
        email
        logotype
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStoryboardEmail = /* GraphQL */ `
  query GetStoryboardEmail($id: ID!) {
    getStoryboardEmail(id: $id) {
      id
      distributorID
      content
      email
      recipientEmail
      storyId
      storyUserID
      static
      createdAt
      updatedAt
    }
  }
`;
export const listStoryboardEmails = /* GraphQL */ `
  query ListStoryboardEmails(
    $filter: ModelStoryboardEmailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStoryboardEmails(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        distributorID
        content
        email
        recipientEmail
        storyId
        storyUserID
        static
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStoryboard = /* GraphQL */ `
  query GetStoryboard($id: ID!) {
    getStoryboard(id: $id) {
      id
      distributorID
      created_at_flt
      content
      catalogData
      logoGqlId
      distributorLogoGqlId
      email
      phone_number
      storyUserID
      static
      name
      showPrices
      showName
      showEmail
      showMoq
      useCAD
      createdAt
      updatedAt
    }
  }
`;
export const listStoryboards = /* GraphQL */ `
  query ListStoryboards(
    $filter: ModelStoryboardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStoryboards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        distributorID
        created_at_flt
        content
        catalogData
        logoGqlId
        distributorLogoGqlId
        email
        phone_number
        storyUserID
        static
        name
        showPrices
        showName
        showEmail
        showMoq
        useCAD
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStoryboardProduct = /* GraphQL */ `
  query GetStoryboardProduct($id: ID!) {
    getStoryboardProduct(id: $id) {
      id
      item_number
      item_name
      brand
      catalog_section
      item_description
      keywords
      url
      custom
      static
      log
      prodFileExists
      prodFileKey
      prodColorOptions
      bgFileExists
      bgFileKey
      ovrFileExists
      ovrFileKey
      emblFileExists
      imprintData
      imprintDataArray
      colors
      verticals
      lchRanges
      top20
      price
      moq
      code
      eqp_can
      createdAt
      updatedAt
    }
  }
`;
export const listStoryboardProducts = /* GraphQL */ `
  query ListStoryboardProducts(
    $filter: ModelStoryboardProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStoryboardProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        item_number
        item_name
        brand
        catalog_section
        item_description
        keywords
        url
        custom
        static
        log
        prodFileExists
        prodFileKey
        prodColorOptions
        bgFileExists
        bgFileKey
        ovrFileExists
        ovrFileKey
        emblFileExists
        imprintData
        imprintDataArray
        colors
        verticals
        lchRanges
        top20
        price
        moq
        code
        eqp_can
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byResId = /* GraphQL */ `
  query ByResId(
    $resultid: String
    $sortDirection: ModelSortDirection
    $filter: ModelProIdEmailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byResId(
      resultid: $resultid
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        resultid
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const finalsByResultidsPlease = /* GraphQL */ `
  query FinalsByResultidsPlease(
    $resultid: String
    $id: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelIdFinLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    finalsByResultidsPlease(
      resultid: $resultid
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        finals_location
        resultid
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const iboByResId = /* GraphQL */ `
  query IboByResId(
    $resultid: String
    $sortDirection: ModelSortDirection
    $filter: ModelImageBrandObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    iboByResId(
      resultid: $resultid
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        resultid
        img_orig_filename
        brand
        img_cloud_url
        img_cloud_url_o
        input_name
        phone
        processedFile
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const iboByResId2 = /* GraphQL */ `
  query IboByResId2(
    $resultid: String
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelImageBrandObjectBackup2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    iboByResId2(
      resultid: $resultid
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        resultid
        img_orig_filename
        brand
        img_cloud_url
        img_cloud_url_o
        input_name
        phone
        processedFile
        createdAt
        createdAt2Ms
        processingFile
        updatedAt
      }
      nextToken
    }
  }
`;
export const iboByCreatedAt2 = /* GraphQL */ `
  query IboByCreatedAt2(
    $createdAt: AWSDateTime
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelImageBrandObjectBackup2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    iboByCreatedAt2(
      createdAt: $createdAt
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        resultid
        img_orig_filename
        brand
        img_cloud_url
        img_cloud_url_o
        input_name
        phone
        processedFile
        createdAt
        createdAt2Ms
        processingFile
        updatedAt
      }
      nextToken
    }
  }
`;
export const iboByEmail2 = /* GraphQL */ `
  query IboByEmail2(
    $email: String
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelImageBrandObjectBackup2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    iboByEmail2(
      email: $email
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        resultid
        img_orig_filename
        brand
        img_cloud_url
        img_cloud_url_o
        input_name
        phone
        processedFile
        createdAt
        createdAt2Ms
        processingFile
        updatedAt
      }
      nextToken
    }
  }
`;
export const iboByCreatedAt2Ms = /* GraphQL */ `
  query IboByCreatedAt2Ms(
    $createdAt2Ms: Float
    $processingFile: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelImageBrandObjectBackup2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    iboByCreatedAt2Ms(
      createdAt2Ms: $createdAt2Ms
      processingFile: $processingFile
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        resultid
        img_orig_filename
        brand
        img_cloud_url
        img_cloud_url_o
        input_name
        phone
        processedFile
        createdAt
        createdAt2Ms
        processingFile
        updatedAt
      }
      nextToken
    }
  }
`;
export const inkLogoByResultId = /* GraphQL */ `
  query InkLogoByResultId(
    $result_id: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelinkLogoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inkLogoByResultId(
      result_id: $result_id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        updatedAt
      }
      nextToken
    }
  }
`;
export const inkLogoByPing = /* GraphQL */ `
  query InkLogoByPing(
    $processing_file: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelinkLogoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inkLogoByPing(
      processing_file: $processing_file
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        updatedAt
      }
      nextToken
    }
  }
`;
export const inkLogoByPred = /* GraphQL */ `
  query InkLogoByPred(
    $processed_file: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelinkLogoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inkLogoByPred(
      processed_file: $processed_file
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        updatedAt
      }
      nextToken
    }
  }
`;
export const inkLogoByEmail = /* GraphQL */ `
  query InkLogoByEmail(
    $email: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelinkLogoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inkLogoByEmail(
      email: $email
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        updatedAt
      }
      nextToken
    }
  }
`;
export const inkLogoByLogoName = /* GraphQL */ `
  query InkLogoByLogoName(
    $logo_name: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelinkLogoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inkLogoByLogoName(
      logo_name: $logo_name
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        updatedAt
      }
      nextToken
    }
  }
`;
export const inkLogoByTesseract = /* GraphQL */ `
  query InkLogoByTesseract(
    $tesseract: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelinkLogoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inkLogoByTesseract(
      tesseract: $tesseract
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        updatedAt
      }
      nextToken
    }
  }
`;
export const earlyStuffs2ByResultId = /* GraphQL */ `
  query EarlyStuffs2ByResultId(
    $result_id: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelearlyStuffs2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    earlyStuffs2ByResultId(
      result_id: $result_id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        square_svg_url
        unsquare_svg_url
        palette
        pop_color
        static
        ink_logo {
          id
          createdAt
          created_at_flt
          processing_file
          processed_file
          proc_at
          proc_by
          email
          email2
          input_name
          result_id
          brand
          category
          brands
          phone
          user_name
          img_orig_filename
          img_cloud_url_o
          logo_named
          logo_name
          tesseract
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const earlyStuffs2ByPing = /* GraphQL */ `
  query EarlyStuffs2ByPing(
    $processing_file: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelearlyStuffs2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    earlyStuffs2ByPing(
      processing_file: $processing_file
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        square_svg_url
        unsquare_svg_url
        palette
        pop_color
        static
        ink_logo {
          id
          createdAt
          created_at_flt
          processing_file
          processed_file
          proc_at
          proc_by
          email
          email2
          input_name
          result_id
          brand
          category
          brands
          phone
          user_name
          img_orig_filename
          img_cloud_url_o
          logo_named
          logo_name
          tesseract
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const earlyStuffs2ByPred = /* GraphQL */ `
  query EarlyStuffs2ByPred(
    $processed_file: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelearlyStuffs2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    earlyStuffs2ByPred(
      processed_file: $processed_file
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        square_svg_url
        unsquare_svg_url
        palette
        pop_color
        static
        ink_logo {
          id
          createdAt
          created_at_flt
          processing_file
          processed_file
          proc_at
          proc_by
          email
          email2
          input_name
          result_id
          brand
          category
          brands
          phone
          user_name
          img_orig_filename
          img_cloud_url_o
          logo_named
          logo_name
          tesseract
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const earlyStuffs2ByLogoName = /* GraphQL */ `
  query EarlyStuffs2ByLogoName(
    $logo_name: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelearlyStuffs2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    earlyStuffs2ByLogoName(
      logo_name: $logo_name
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        square_svg_url
        unsquare_svg_url
        palette
        pop_color
        static
        ink_logo {
          id
          createdAt
          created_at_flt
          processing_file
          processed_file
          proc_at
          proc_by
          email
          email2
          input_name
          result_id
          brand
          category
          brands
          phone
          user_name
          img_orig_filename
          img_cloud_url_o
          logo_named
          logo_name
          tesseract
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const earlyStuffs2ByTesseract = /* GraphQL */ `
  query EarlyStuffs2ByTesseract(
    $tesseract: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelearlyStuffs2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    earlyStuffs2ByTesseract(
      tesseract: $tesseract
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        square_svg_url
        unsquare_svg_url
        palette
        pop_color
        static
        ink_logo {
          id
          createdAt
          created_at_flt
          processing_file
          processed_file
          proc_at
          proc_by
          email
          email2
          input_name
          result_id
          brand
          category
          brands
          phone
          user_name
          img_orig_filename
          img_cloud_url_o
          logo_named
          logo_name
          tesseract
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const earlyStuffs2ByPopColor = /* GraphQL */ `
  query EarlyStuffs2ByPopColor(
    $pop_color: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelearlyStuffs2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    earlyStuffs2ByPopColor(
      pop_color: $pop_color
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        processing_file
        processed_file
        proc_at
        proc_by
        email
        email2
        input_name
        result_id
        brand
        category
        brands
        phone
        user_name
        img_orig_filename
        img_cloud_url_o
        logo_named
        logo_name
        tesseract
        square_svg_url
        unsquare_svg_url
        palette
        pop_color
        static
        ink_logo {
          id
          createdAt
          created_at_flt
          processing_file
          processed_file
          proc_at
          proc_by
          email
          email2
          input_name
          result_id
          brand
          category
          brands
          phone
          user_name
          img_orig_filename
          img_cloud_url_o
          logo_named
          logo_name
          tesseract
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedLogoByResultId = /* GraphQL */ `
  query NamedLogoByResultId(
    $named: String
    $id: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedLogoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedLogoByResultId(
      named: $named
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        email
        input_name
        result_id
        user_name
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        named
        misc_0
        misc_1
        misc_2
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedLogoByCreatedAt = /* GraphQL */ `
  query NamedLogoByCreatedAt(
    $createdAt: AWSDateTime
    $id: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedLogoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedLogoByCreatedAt(
      createdAt: $createdAt
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        email
        input_name
        result_id
        user_name
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        named
        misc_0
        misc_1
        misc_2
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedLogoByEmail = /* GraphQL */ `
  query NamedLogoByEmail(
    $email: String
    $id: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedLogoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedLogoByEmail(
      email: $email
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        email
        input_name
        result_id
        user_name
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        named
        misc_0
        misc_1
        misc_2
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedLogoByMisc0 = /* GraphQL */ `
  query NamedLogoByMisc0(
    $misc_0: String
    $id: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedLogoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedLogoByMisc0(
      misc_0: $misc_0
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        email
        input_name
        result_id
        user_name
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        named
        misc_0
        misc_1
        misc_2
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedLogoByMisc1 = /* GraphQL */ `
  query NamedLogoByMisc1(
    $misc_1: String
    $id: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedLogoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedLogoByMisc1(
      misc_1: $misc_1
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        email
        input_name
        result_id
        user_name
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        named
        misc_0
        misc_1
        misc_2
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedLogoByMisc2 = /* GraphQL */ `
  query NamedLogoByMisc2(
    $misc_2: String
    $id: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedLogoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedLogoByMisc2(
      misc_2: $misc_2
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        email
        input_name
        result_id
        user_name
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        named
        misc_0
        misc_1
        misc_2
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByVctrzdSortCreatedFlt = /* GraphQL */ `
  query NamedByVctrzdSortCreatedFlt(
    $vectorized: String
    $created_at_flt: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByVctrzdSortCreatedFlt(
      vectorized: $vectorized
      created_at_flt: $created_at_flt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByVctrzdSortName = /* GraphQL */ `
  query NamedByVctrzdSortName(
    $vectorized: String
    $named: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByVctrzdSortName(
      vectorized: $vectorized
      named: $named
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByVctrzdSortEmail = /* GraphQL */ `
  query NamedByVctrzdSortEmail(
    $vectorized: String
    $email: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByVctrzdSortEmail(
      vectorized: $vectorized
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByEmailSentSortCreatedFlt = /* GraphQL */ `
  query NamedByEmailSentSortCreatedFlt(
    $email_sent: String
    $created_at_flt: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByEmailSentSortCreatedFlt(
      email_sent: $email_sent
      created_at_flt: $created_at_flt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByStaticSortCreatedFlt = /* GraphQL */ `
  query NamedByStaticSortCreatedFlt(
    $static: String
    $created_at_flt: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByStaticSortCreatedFlt(
      static: $static
      created_at_flt: $created_at_flt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByStaticSortNamed = /* GraphQL */ `
  query NamedByStaticSortNamed(
    $static: String
    $named: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByStaticSortNamed(
      static: $static
      named: $named
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByStaticSortEmail = /* GraphQL */ `
  query NamedByStaticSortEmail(
    $static: String
    $email: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByStaticSortEmail(
      static: $static
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByResultIdSortCreatedFlt = /* GraphQL */ `
  query NamedByResultIdSortCreatedFlt(
    $result_id: String
    $created_at_flt: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByResultIdSortCreatedFlt(
      result_id: $result_id
      created_at_flt: $created_at_flt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByProcessingSortCreatedFlt = /* GraphQL */ `
  query NamedByProcessingSortCreatedFlt(
    $processing: String
    $created_at_flt: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByProcessingSortCreatedFlt(
      processing: $processing
      created_at_flt: $created_at_flt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByProcessedSortCreatedFlt = /* GraphQL */ `
  query NamedByProcessedSortCreatedFlt(
    $processed: String
    $created_at_flt: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByProcessedSortCreatedFlt(
      processed: $processed
      created_at_flt: $created_at_flt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByCreatedFltDaySortCreatedFlt = /* GraphQL */ `
  query NamedByCreatedFltDaySortCreatedFlt(
    $created_at_flt_day: Float
    $created_at_flt: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByCreatedFltDaySortCreatedFlt(
      created_at_flt_day: $created_at_flt_day
      created_at_flt: $created_at_flt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByCreatedFltDaySortNamed = /* GraphQL */ `
  query NamedByCreatedFltDaySortNamed(
    $created_at_flt_day: Float
    $named: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByCreatedFltDaySortNamed(
      created_at_flt_day: $created_at_flt_day
      named: $named
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByMisc0 = /* GraphQL */ `
  query NamedByMisc0(
    $misc_0: String
    $created_at_flt: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByMisc0(
      misc_0: $misc_0
      created_at_flt: $created_at_flt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByMisc1 = /* GraphQL */ `
  query NamedByMisc1(
    $misc_1: String
    $created_at_flt: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByMisc1(
      misc_1: $misc_1
      created_at_flt: $created_at_flt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const namedByMisc2 = /* GraphQL */ `
  query NamedByMisc2(
    $misc_2: String
    $created_at_flt: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelnamedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    namedByMisc2(
      misc_2: $misc_2
      created_at_flt: $created_at_flt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        created_at_flt
        named
        email
        input_name
        result_id
        user_name
        created_at_flt_day
        img_orig_filename
        img_cloud_url_o
        img_cloud_url
        misc_0
        misc_1
        misc_2
        vectorized
        email_sent
        static
        processed
        processing
        updatedAt
      }
      nextToken
    }
  }
`;
export const svgsByResultId = /* GraphQL */ `
  query SvgsByResultId(
    $result_id: String
    $sortDirection: ModelSortDirection
    $filter: ModelSvgObjectsArrayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    svgsByResultId(
      result_id: $result_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        data
        result_id
        logo_url
        email
        logotype
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const svgsByEmail = /* GraphQL */ `
  query SvgsByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelSvgObjectsArrayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    svgsByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        data
        result_id
        logo_url
        email
        logotype
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const svgsByEmailSortLogoType = /* GraphQL */ `
  query SvgsByEmailSortLogoType(
    $email: String
    $logotype: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSvgObjectsArrayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    svgsByEmailSortLogoType(
      email: $email
      logotype: $logotype
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        data
        result_id
        logo_url
        email
        logotype
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const svgsByLogoTypeSortEmail = /* GraphQL */ `
  query SvgsByLogoTypeSortEmail(
    $logotype: String
    $email: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSvgObjectsArrayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    svgsByLogoTypeSortEmail(
      logotype: $logotype
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        data
        result_id
        logo_url
        email
        logotype
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const storyByEmail = /* GraphQL */ `
  query StoryByEmail(
    $email: String
    $created_at_flt: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryboardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storyByEmail(
      email: $email
      created_at_flt: $created_at_flt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        distributorID
        created_at_flt
        content
        catalogData
        logoGqlId
        distributorLogoGqlId
        email
        phone_number
        storyUserID
        static
        name
        showPrices
        showName
        showEmail
        showMoq
        useCAD
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const prodByNumberSortName = /* GraphQL */ `
  query ProdByNumberSortName(
    $item_number: String
    $item_name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryboardProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    prodByNumberSortName(
      item_number: $item_number
      item_name: $item_name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        item_number
        item_name
        brand
        catalog_section
        item_description
        keywords
        url
        custom
        static
        log
        prodFileExists
        prodFileKey
        prodColorOptions
        bgFileExists
        bgFileKey
        ovrFileExists
        ovrFileKey
        emblFileExists
        imprintData
        imprintDataArray
        colors
        verticals
        lchRanges
        top20
        price
        moq
        code
        eqp_can
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const prodByBrandSortName = /* GraphQL */ `
  query ProdByBrandSortName(
    $brand: String
    $item_name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryboardProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    prodByBrandSortName(
      brand: $brand
      item_name: $item_name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        item_number
        item_name
        brand
        catalog_section
        item_description
        keywords
        url
        custom
        static
        log
        prodFileExists
        prodFileKey
        prodColorOptions
        bgFileExists
        bgFileKey
        ovrFileExists
        ovrFileKey
        emblFileExists
        imprintData
        imprintDataArray
        colors
        verticals
        lchRanges
        top20
        price
        moq
        code
        eqp_can
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const prodByBrandSortKeywords = /* GraphQL */ `
  query ProdByBrandSortKeywords(
    $brand: String
    $keywords: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryboardProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    prodByBrandSortKeywords(
      brand: $brand
      keywords: $keywords
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        item_number
        item_name
        brand
        catalog_section
        item_description
        keywords
        url
        custom
        static
        log
        prodFileExists
        prodFileKey
        prodColorOptions
        bgFileExists
        bgFileKey
        ovrFileExists
        ovrFileKey
        emblFileExists
        imprintData
        imprintDataArray
        colors
        verticals
        lchRanges
        top20
        price
        moq
        code
        eqp_can
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const prodByStaticSortKeywords = /* GraphQL */ `
  query ProdByStaticSortKeywords(
    $static: String
    $keywords: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryboardProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    prodByStaticSortKeywords(
      static: $static
      keywords: $keywords
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        item_number
        item_name
        brand
        catalog_section
        item_description
        keywords
        url
        custom
        static
        log
        prodFileExists
        prodFileKey
        prodColorOptions
        bgFileExists
        bgFileKey
        ovrFileExists
        ovrFileKey
        emblFileExists
        imprintData
        imprintDataArray
        colors
        verticals
        lchRanges
        top20
        price
        moq
        code
        eqp_can
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const prodByStaticSortName = /* GraphQL */ `
  query ProdByStaticSortName(
    $static: String
    $item_name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryboardProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    prodByStaticSortName(
      static: $static
      item_name: $item_name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        item_number
        item_name
        brand
        catalog_section
        item_description
        keywords
        url
        custom
        static
        log
        prodFileExists
        prodFileKey
        prodColorOptions
        bgFileExists
        bgFileKey
        ovrFileExists
        ovrFileKey
        emblFileExists
        imprintData
        imprintDataArray
        colors
        verticals
        lchRanges
        top20
        price
        moq
        code
        eqp_can
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const prodByStaticSortNumber = /* GraphQL */ `
  query ProdByStaticSortNumber(
    $static: String
    $item_number: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryboardProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    prodByStaticSortNumber(
      static: $static
      item_number: $item_number
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        item_number
        item_name
        brand
        catalog_section
        item_description
        keywords
        url
        custom
        static
        log
        prodFileExists
        prodFileKey
        prodColorOptions
        bgFileExists
        bgFileKey
        ovrFileExists
        ovrFileKey
        emblFileExists
        imprintData
        imprintDataArray
        colors
        verticals
        lchRanges
        top20
        price
        moq
        code
        eqp_can
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const prodByStaticSortBrand = /* GraphQL */ `
  query ProdByStaticSortBrand(
    $static: String
    $brand: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryboardProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    prodByStaticSortBrand(
      static: $static
      brand: $brand
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        item_number
        item_name
        brand
        catalog_section
        item_description
        keywords
        url
        custom
        static
        log
        prodFileExists
        prodFileKey
        prodColorOptions
        bgFileExists
        bgFileKey
        ovrFileExists
        ovrFileKey
        emblFileExists
        imprintData
        imprintDataArray
        colors
        verticals
        lchRanges
        top20
        price
        moq
        code
        eqp_can
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const prodByProdFile = /* GraphQL */ `
  query ProdByProdFile(
    $prodFileExists: String
    $item_number: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryboardProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    prodByProdFile(
      prodFileExists: $prodFileExists
      item_number: $item_number
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        item_number
        item_name
        brand
        catalog_section
        item_description
        keywords
        url
        custom
        static
        log
        prodFileExists
        prodFileKey
        prodColorOptions
        bgFileExists
        bgFileKey
        ovrFileExists
        ovrFileKey
        emblFileExists
        imprintData
        imprintDataArray
        colors
        verticals
        lchRanges
        top20
        price
        moq
        code
        eqp_can
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const prodByProdFileSortBrand = /* GraphQL */ `
  query ProdByProdFileSortBrand(
    $prodFileExists: String
    $brand: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryboardProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    prodByProdFileSortBrand(
      prodFileExists: $prodFileExists
      brand: $brand
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        item_number
        item_name
        brand
        catalog_section
        item_description
        keywords
        url
        custom
        static
        log
        prodFileExists
        prodFileKey
        prodColorOptions
        bgFileExists
        bgFileKey
        ovrFileExists
        ovrFileKey
        emblFileExists
        imprintData
        imprintDataArray
        colors
        verticals
        lchRanges
        top20
        price
        moq
        code
        eqp_can
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const prodByProdFileSortTop20 = /* GraphQL */ `
  query ProdByProdFileSortTop20(
    $prodFileExists: String
    $top20: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryboardProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    prodByProdFileSortTop20(
      prodFileExists: $prodFileExists
      top20: $top20
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        item_number
        item_name
        brand
        catalog_section
        item_description
        keywords
        url
        custom
        static
        log
        prodFileExists
        prodFileKey
        prodColorOptions
        bgFileExists
        bgFileKey
        ovrFileExists
        ovrFileKey
        emblFileExists
        imprintData
        imprintDataArray
        colors
        verticals
        lchRanges
        top20
        price
        moq
        code
        eqp_can
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const prodByTop20 = /* GraphQL */ `
  query ProdByTop20(
    $top20: String
    $sortDirection: ModelSortDirection
    $filter: ModelStoryboardProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    prodByTop20(
      top20: $top20
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        item_number
        item_name
        brand
        catalog_section
        item_description
        keywords
        url
        custom
        static
        log
        prodFileExists
        prodFileKey
        prodColorOptions
        bgFileExists
        bgFileKey
        ovrFileExists
        ovrFileKey
        emblFileExists
        imprintData
        imprintDataArray
        colors
        verticals
        lchRanges
        top20
        price
        moq
        code
        eqp_can
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
