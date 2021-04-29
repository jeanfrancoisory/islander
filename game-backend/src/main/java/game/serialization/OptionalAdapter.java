package game.serialization;

import java.util.Optional;
import javax.xml.bind.annotation.adapters.XmlAdapter;

public class OptionalAdapter<T> extends XmlAdapter<T, Optional<T>> {
    @Override
    public Optional<T> unmarshal(final T value) {
        return Optional.ofNullable(value);
    }

    @Override
    public T marshal(final Optional<T> value) {
        return value.orElse(null);
    }
}

