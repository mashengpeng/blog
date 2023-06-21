# ValidationHelper

```java
@Slf4j
public class ValidationHelper {
    private final static Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    private final static List<Class> basicTypeList = new ArrayList<>();

    static {
        basicTypeList.add(Boolean.class);
        basicTypeList.add(Byte.class);
        basicTypeList.add(Short.class);
        basicTypeList.add(Integer.class);
        basicTypeList.add(Long.class);
        basicTypeList.add(Character.class);
        basicTypeList.add(Double.class);
        basicTypeList.add(Float.class);
        basicTypeList.add(String.class);
        basicTypeList.add(BigDecimal.class);
        basicTypeList.add(AtomicLong.class);
        basicTypeList.add(AtomicInteger.class);
    }

    /**
     * 手动执行注解验证，效果等同于@Valid
     *
     */
    public static <T> String validator(T object) {
        return validator(object,false);
    }

    public static <T> String validator(T object, boolean fieldValidate) {
        String message = BaseResultType.SUCCESS.getDesc();
        Set<ConstraintViolation<T>> validResult = validator.validate(object);
        if (CollectionUtils.isNotEmpty(validResult)) {
            ConstraintViolation<T> violation = validResult.iterator().next();
            message = violation.getMessage();
        }
        if(fieldValidate) {
            Field[] fields = object.getClass().getDeclaredFields();
            for(Field field : fields) {
                Class clazz = field.getType();
                //如果属性是基本类型，对象校验时时已经验证过
                if(isBasicType(clazz)) {
                    continue;
                }
                //当属性为对象时，验证对象里面的validate
                Object obj = null;
                field.setAccessible(true);
                try {
                    obj = field.get(object);
                } catch (IllegalArgumentException | IllegalAccessException e) {
                    log.error(e.getMessage(),e);
                }
                if(obj != null) {
                    if(obj instanceof Collection) {
                        Collection collection = (Collection)obj;
                        message =  validator(collection,fieldValidate);
                    }else if(obj instanceof Map) {
                        Map map = (Map)obj;
                        message =  validator(map,fieldValidate);
                    }else {
                        message = validator(obj,fieldValidate);
                    }

                    if(!BaseResultType.SUCCESS.getDesc().equals(message)) {
                        return message;
                    }
                }
            }

        }

        return message;
    }

    public static boolean isBasicType(Class clazz) {
        return basicTypeList.contains(clazz);

    }


    /**
     * 检验集合
     *
     * @param collection
     * @return
     */
    public static <T> String validator(Collection<T> collection) {
        return validator(collection, false);
    }

    /**
     * 检验集合
     *
     * @param collection
    //	 * @param allowEmpty
     *            标记是否允许集合为空
     * @return
     * @throws IllegalAccessException
     * @throws IllegalArgumentException
     */
    public static <T> String validator(Collection<T> collection, boolean fieldValidate) {
        String result = "";
        for (T t : collection) {
            if (t instanceof Collection) {
                result = validator((Collection<?>) t, fieldValidate);
            } else if (t instanceof Map<?, ?>) {
                result = validator((Map<?, ?>) t, fieldValidate);
            } else {
                result = validator(t,fieldValidate);
                if(!BaseResultType.SUCCESS.getDesc().equals(result)) {
                    return result;
                }
            }
        }
        return result;
    }

    /**
     * 检验Map
     *
     * @param map
     * @return
     */
    public static <K, V> String validator(Map<K, V> map) {
        return validator(map, false);
    }

    /**
     * 检验Map
     *
     * @param map
    //	 * @param allowEmpty
     *            标记是否允许集合为空
     * @return
     */
    public static <K, V> String validator(Map<K, V> map, boolean fieldValidate) {
        String result = validator(map.values(), fieldValidate);
        return result;
    }

    /**
     * 往ConstraintValidatorContext写入指定错误信息
     *
     * @param context
     * @param message
     */
    public static void errorMessage(ConstraintValidatorContext context, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
    }
}

```