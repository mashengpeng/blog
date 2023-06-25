(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{425:function(a,r,t){"use strict";t.r(r);var s=t(2),e=Object(s.a)({},(function(){var a=this,r=a._self._c;return r("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[r("h1",{attrs:{id:"gitlab-runner"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#gitlab-runner"}},[a._v("#")]),a._v(" gitlab runner")]),a._v(" "),r("hr"),a._v(" "),r("h2",{attrs:{id:"安装gitlab-runner"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#安装gitlab-runner"}},[a._v("#")]),a._v(" 安装gitlab runner")]),a._v(" "),r("div",{staticClass:"language-bash line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-bash"}},[r("code",[r("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" gitlab-runner "),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--restart")]),a._v(" always "),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--env")]),a._v(" "),r("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("TZ")]),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("CN "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n"),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" /docker/gitlab-runner/config:/etc/gitlab-runner "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n"),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" /var/run/docker.sock:/var/run/docker.sock "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\ngitlab/gitlab-runner:latest\n")])]),a._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[a._v("1")]),r("br"),r("span",{staticClass:"line-number"},[a._v("2")]),r("br"),r("span",{staticClass:"line-number"},[a._v("3")]),r("br"),r("span",{staticClass:"line-number"},[a._v("4")]),r("br")])]),r("p",[a._v("注意第二个挂载是让其与宿主docker的守护进程通信,不可更改,从而后续的CI/CD过程通过新建容器来实现")]),a._v(" "),r("h2",{attrs:{id:"gitlab上配置runner"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#gitlab上配置runner"}},[a._v("#")]),a._v(" gitlab上配置runner")]),a._v(" "),r("p",[a._v("主要是填写url和token,注意勾选执行untagged的任务")]),a._v(" "),r("h2",{attrs:{id:"gitlab-runner配置"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#gitlab-runner配置"}},[a._v("#")]),a._v(" gitlab runner配置")]),a._v(" "),r("div",{staticClass:"language-bash line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-bash"}},[r("code",[a._v("gitlab-runner register\n")])]),a._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[a._v("1")]),r("br")])]),r("p",[a._v("需要注意的是执行器填写docker,执行器版本可以写alpine:latest")])])}),[],!1,null,null,null);r.default=e.exports}}]);