# developer-site
[![Build Status](https://travis-ci.org/umasuo/developer-site.svg?branch=master)](https://travis-ci.org/umasuo/developer-site)
> Eva Cloud developer website.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

/**
   * auto generated uuid.
   */
  private String id;

  /**
   * The Created at.
   */
  protected ZonedDateTime createdAt;

  /**
   * The Last modified at.
   */
  protected ZonedDateTime lastModifiedAt;

  /**
   * version used for update date check.
   */
  private Integer version;

  /**
   * which developer this data definition belong to.
   */
  @NotNull
  private String developerId;

  /**
   * data id defined by the developer.
   */
  @NotNull
  private String dataId;

  /**
   * the data structure.
   */
  @NotNull
  private PointType dataType;

  /**
   * name of this definition.
   */
  @NotNull
  private String name;

  /**
   * describe the usage of this definition.
   */
  @NotNull
  private String description;
