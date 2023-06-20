# gitlab-CI/CD

## gitlab runner

---

### 安装gitlab runner

```bash
docker run -d --name gitlab-runner --restart always --env TZ=CN \
-v /docker/gitlab-runner/config:/etc/gitlab-runner \
-v /var/run/docker.sock:/var/run/docker.sock \
gitlab/gitlab-runner:latest
```

注意第二个挂载是让其与宿主docker的守护进程通信,不可更改,从而后续的CI/CD过程通过新建容器来实现

### gitlab上配置runner

主要是填写url和token,注意勾选执行untagged的任务

### gitlab runner配置

```bash
gitlab-runner register
```

需要注意的是执行器填写docker,执行器版本可以写alpine:latest

## .gitlab-ci.yml

例子:

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

| 术语        | 解释                                 |
|:----------|:-----------------------------------|
| build-job | job名称,可任意填                         |
| image     | 配置job在指定的镜像上执行                     |
| script    | 环境准备好后运行的脚本                        |
| artifacts | 保存job执行后的结果,paths指定保存路径.用来给后续job使用 |
