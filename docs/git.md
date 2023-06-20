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