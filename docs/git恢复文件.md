# git恢复文件

## 没有add也没有commit

无力回天,回收站看看

## add过但是没有commit

```bash
# 找出所有没有被引用的文件,放入.git/lost-found/other文件里
git fsck --lost-found;

cd /.git/lost-found/other;

# 打印文件类型,找出想要的文件
for file in *; do git cat-file -t $file; done;
```

## 已经commit过

直接git reflog查看上一次commit id,切过去即可

## 教训

mybatis generate生成文件,生成的时候add了一次,之后做了修改,不小心又generate了一次,文件被覆盖.相当于没有add也没有commit过,同时文件还被覆盖了不是删除,再也找不到了...