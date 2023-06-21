# git

## 配置git pull的方式

```bash
git config pull.rebase false  # merge
git config pull.rebase true   # rebase
git config pull.ff only       # fast-forward only
```

---

## merge回退之后为什么奇怪

如果merge是fast-forword，那么git reset —hard head^回不到merge之前的状态，需要先git
reflog查看之前在的commit，然后reset过去。反之则能回到merge之前的状态。

---

## 查看两个分支merge是否有冲突

git merge --no-commit <branch_name>  
这个命令会将指定分支的更改合并到当前分支，但不会自动提交合并结果。如果有冲突，则会显示相应的提示。  
如果没有冲突，则可以使用以下命令撤销合并：  
git merge --abort

---

## 强制一个分支等于另一个分支

git checkout <target_branch>  
git reset --hard <source_branch>  
git push -f origin <target_branch>

---

## 查看一个分支和上游分支的diff

git diff head..@{u}
---

## git恢复文件

### 没有add也没有commit

无力回天,回收站看看

### add过但是没有commit

```bash
# 找出所有没有被引用的文件,放入.git/lost-found/other文件里
git fsck --lost-found;

cd /.git/lost-found/other;

# 打印文件类型,找出想要的文件
for file in *; do git cat-file -t $file; done;
```

### 已经commit过

直接git reflog查看上一次commit id,切过去即可

## commit表示方法

祖先引用

- 如果你在引用的尾部加上一个`^`（脱字符）， Git 会将其解析为该引用的上一个提交。可以在`^`后面添加一个数字来指明想要**哪一个
  **父提交——例如`d921970^2`代表 “d921970 的第二父提交” 这个语法只适用于合并的提交，因为合并提交会有多个父提交。
  合并提交的第一父提交是你合并时所在分支（通常为`master`），而第二父提交是你所合并的分支（例如`topic`）
- 另一种指明祖先提交的方法是`~`（波浪号）。 同样是指向第一父提交，因此`HEAD~`和`HEAD^`是等价的。
  而区别在于你在后面加数字的时候。`HEAD~2`代表“第一父提交的第一父提交”，也就是“祖父提交”——Git 会根据你指定的次数获取对应的第一父提交。

### 双点

```bash
git log master..experiment
# 在 experiment 分支中而不在 master 分支中的提交

git log origin/master..HEAD
# 在你当前分支中而不在远程 `origin`中的提交

git log origin/master..
# 默认右侧为 `HEAD`
```

### 多点

Git 允许你在任意引用前加上`^`字符或者`--not`来指明你不希望提交被包含其中的分支。 因此下列三个命令是等价的：

```bash
git log refA..refB
git log ^refA refB
git log refB --not refA
```

### 三点（差集）

选择出被两个引用**之一**包含但又不被两者同时包含的提交。

`log`命令的一个常用参数是`--left-right`，它会显示每个提交到底处于哪一侧的分支。

```bash
$ git log --left-right master...experiment
< F
< E
> D
> C
```

