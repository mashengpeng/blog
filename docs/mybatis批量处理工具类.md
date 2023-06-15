# mybatis批量处理工具类

```java


@Slf4j
@Component
public class BatchUtil implements ApplicationContextAware {

    private static ApplicationContext applicationContext;

    public static <M, T> void batchExecutor(List<T> list, Class<M> clazz, BiConsumer<M, T> biConsumer) {
        if (list == null || list.size() == 0) {
            log.info("BatchInsertUtil batchInsert list data is null!");
            return;
        }
        SqlSessionFactory sqlSessionFactory = applicationContext.getBean(SqlSessionFactory.class);
        SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH);
        try {
            M mapper = session.getMapper(clazz);
            list.forEach(a -> biConsumer.accept(mapper, a));
            session.commit(!TransactionSynchronizationManager.isSynchronizationActive());
        } catch (Exception e) {
            e.printStackTrace();
            log.error("BatchInsertUtil batchInsert is exception！clazz={}", clazz.getName(), e);
            session.rollback();
        } finally {
            session.close();
        }
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        BatchUtil.applicationContext = applicationContext;
    }
}

```

