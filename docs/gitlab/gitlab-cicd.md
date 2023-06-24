# .gitlab-ci.yml

| 术语            | 解释                                                                                                 |
|:--------------|:---------------------------------------------------------------------------------------------------|
| job           | job名称,可任意填                                                                                         |
| image         | 配置job在指定的镜像上执行                                                                                     |
| script        | 环境准备好后运行的脚本                                                                                        |
| artifacts     | 保存job执行后的结果,paths指定保存路径.用来给后续job使用                                                                 |
| stage         | 通常把job分为各个stage,同一个stage的job可以并行,下一个stage的job要等上一个stage的job全部完成才能执行.其中任意一个job失败,stage就失败,后续job不会执行 |
| stages        | 列出所有的stage列表并按顺序执行,默认情况下有build,test,deploy三个stage                                                  |
| allow_failure | 允许job失败,不影响pipeline执行                                                                              |
| dependencies  | 指定只从列出的job中获取artifacts                                                                             |                                                                                
| rules         | 指定job在在哪个pipeline执行,多个rule从上到下判断,有一个满足就添加到pipeline                                                 |

## Case 1

```yaml
build-job:
  image: node
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - "build/"
```

## Case 2

```yaml
stages: # List of stages for jobs and their order of execution
  - build
  - deploy

build-job:
  stage: build   # Set this job to run in the `build` stage
  image: node
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - "build/"

pages:
  stage: deploy  # Set this new job to run in the `deploy` stage
  script:
    - mv build/ public/
  artifacts:
    paths:
      - "public/"
```

## Case 3

```yaml
stages:
  - build
  - test               # Add a `test` stage for the test jobs
  - deploy

build-job:
  stage: build
  image: node
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - "build/"

lint-markdown:
  stage: test
  image: node
  dependencies: [ ]     # Don't fetch any artifacts
  script:
    - npm install markdownlint-cli2 --global           # Install markdownlint into the container
    - markdownlint-cli2 -v                             # Verify the version, useful for troubleshooting
    - markdownlint-cli2 "blog/**/*.md" "docs/**/*.md"  # Lint all markdown files in blog/ and docs/
  allow_failure: true  # This job fails right now, but don't let it stop the pipeline.

test-html:
  stage: test
  image: node
  dependencies:
    - build-job        # Only fetch artifacts from `build-job`
  script:
    - npm install --save-dev htmlhint                  # Install HTMLHint into the container
    - npx htmlhint --version                           # Verify the version, useful for troubleshooting
    - npx htmlhint build/                              # Lint all markdown files in blog/ and docs/

pages:
  stage: deploy
  dependencies:
    - build-job        # Only fetch artifacts from `build-job`
  script:
    - mv build/ public/
  artifacts:
    paths:
      - "public/"
```
