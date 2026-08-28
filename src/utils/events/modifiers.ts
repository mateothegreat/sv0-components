type Func = (...args: any[]) => any;
type Modifier = (fn: (...args: any[]) => void) => (...args: any[]) => void;

export const trusted = <F extends Func>(fn: F): ((...args: Parameters<F>) => any) => {
  return (...args) => {
    if ((args[0] as Event).isTrusted) {
      fn?.apply(this, args);
    }
  };
};

export const self = <F extends Func>(fn: F): ((...args: Parameters<F>) => any) => {
  return (...args) => {
    if ((args[0] as Event).target === (args[0] as Event).currentTarget) {
      fn?.apply(this, args);
    }
  };
};

export const stopPropagation = <F extends Func>(fn: F): ((...args: Parameters<F>) => any) => {
  return (...args) => {
    (args[0] as Event).stopPropagation();
    return fn?.apply(this, args);
  };
};

export const once = <F extends Func>(fn: F): ((...args: Parameters<F>) => any) => {
  let ran = false;

  return (...args) => {
    if (ran) return;
    ran = true;
    return fn?.apply(this, args);
  };
};

export const stopImmediatePropagation = <F extends Func>(
  fn: F
): ((...args: Parameters<F>) => any) => {
  return (...args) => {
    (args[0] as Event).stopImmediatePropagation();
    return fn?.apply(this, args);
  };
};

export const preventDefault = <F extends Func>(fn: F): ((...args: Parameters<F>) => any) => {
  return (...args) => {
    (args[0] as Event).preventDefault();
    return fn?.apply(this, args);
  };
};

/**
 * Creates a callable function with event modifiers
 *
 * ```svelte
 * <script>
 *     const onclick = callable(() => {
 *         console.log('clicked!');
 *     }, preventDefault);
 * </script>
 *
 * <a href="/meow" {onclick}>
 *     <span>i won't redirect you!</span>
 * </a>
 * ```
 *
 * @param fn Callback function
 * @param modifiers Event modifiers
 *
 * @returns The callback function
 */
const callable = <F extends Func>(
  fn: F,
  ...modifiers: Modifier[]
): ((...args: Parameters<F>) => ReturnType<F>) => {
  let acc: (...args: Parameters<F>) => any = fn;

  let arr = modifiers;

  const onceIndex = modifiers.indexOf(once);
  if (onceIndex !== -1) {
    arr.unshift(arr.splice(onceIndex, 1)[0]);
  }

  return arr.reduce((current, modifier) => modifier(current), acc);
};

callable.forEach = <F extends Func>(
  fn: F,
  ...modifiers: Modifier[]
): ((key: string | number) => (...args: Parameters<F>) => ReturnType<F>) => {
  const handlers: Record<string | number, (...args: Parameters<F>) => ReturnType<F>> = {};

  return (key) => {
    if (!handlers[key]) {
      handlers[key] = callable(fn, ...modifiers);
    }

    return handlers[key];
  };
};

export default callable;
