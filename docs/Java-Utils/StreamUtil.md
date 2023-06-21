# StreamUtil

```java
public class StreamUtil {
    public static <V, R> List<R> transform(List<V> list, Function<? super V, ? extends R> valueMapper) {
        return list.stream().filter(d -> d != null).map(valueMapper).collect(Collectors.toList());
    }

    public static <V, R> Set<R> transformToSet(List<V> list, Function<? super V, ? extends R> valueMapper) {
        return list.stream().filter(d -> d != null).map(valueMapper).collect(Collectors.toSet());
    }

    public static <K, V> Map<K, V> toMap(List<V> list, Function<? super V, ? extends K> keyMapper) {
        return list.stream().filter(d -> d != null).collect(Collectors.toMap(keyMapper, d -> d, (d1, d2) -> d1));
    }

    public static <K, V, R> Map<K, R> toMap(List<V> list, Function<? super V, ? extends K> keyMapper, Function<? super V, ? extends R> valueMapper) {
        return list.stream().filter(d -> d != null).collect(Collectors.toMap(keyMapper, valueMapper, (d1, d2) -> d1));
    }

    public static <K, V> Map<K, List<V>> group(List<V> list, Function<? super V, ? extends K> keyMapper) {
        return list.stream().filter(d -> d != null).collect(Collectors.groupingBy(keyMapper));
    }

    public static <K, V, R> Map<K, List<R>> group(List<V> list, Function<? super V, ? extends K> keyMapper, Function<? super V, ? extends R> valueMapper) {
        return list.stream().filter(d -> d != null).collect(Collectors.groupingBy(keyMapper, Collectors.mapping(valueMapper, Collectors.toList())));
    }

    public static <K, V, R> Map<K, Set<R>> groupToSet(List<V> list, Function<? super V, ? extends K> keyMapper, Function<? super V, ? extends R> valueMapper) {
        return list.stream().filter(d -> d != null).collect(Collectors.groupingBy(keyMapper, Collectors.mapping(valueMapper, Collectors.toSet())));
    }

    public static <T> Predicate<T> isDuplicate(Function<? super T, Object> keyExtractor) {
        Map<Object, Boolean> map = new ConcurrentHashMap<>();
        return t -> map.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) != null;
    }
}

```