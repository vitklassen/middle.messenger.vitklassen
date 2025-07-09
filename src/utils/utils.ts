import Component, { ComponentProps } from '../services/Component';
import { StoreEvents, type Indexed } from '../services/Store';
import store from '../services/Store';

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }
  
  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
    // eslint-disable-next-line
  }), value as any); 
  return merge(object as Indexed, result);
}

export function connect<T extends typeof Component>(Block: typeof Component, mapStateToProps: (state: Indexed) => Indexed): T {
  return class extends Block {
    constructor(props: ComponentProps) {
      super({ ...props, ...mapStateToProps(store.getState()) });
      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      }); 
    }
  } as T;
}

export function isEqual(lhs: Indexed, rhs: Indexed): boolean {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key]; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }
    if (value !== rightValue) {
      return false;
    }
  }
  return true;
}

export function debounce<T extends Function>(func: T, delay: number) {
  let timer: NodeJS.Timeout; // eslint-disable-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line
  return function (...args: any) {
    clearTimeout(timer);
    // eslint-disable-next-line
    timer = setTimeout(() => func(...args), delay);
  };
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      // eslint-disable-next-line
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p]; // eslint-disable-line
      }
    } catch (e) {
      lhs[p] = rhs[p]; // eslint-disable-line
    }
  }
  return lhs;
}

function isPlainObject(value: unknown): value is Indexed {
  return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | Indexed {
  return isPlainObject(value) || isArray(value);
}

export function cloneDeep<T extends Indexed>(obj: T) {
  return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    if (item === null || typeof item !== 'object') {
      return item;
    }
    if (item instanceof Date) {
      return new Date((item as Date).valueOf());
    }
    if (item instanceof Array) {
      const copy: ReturnType<typeof _cloneDeep>[] = [];
 
      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i]))); // eslint-disable-line @typescript-eslint/no-unsafe-argument
 
      return copy;
    }
    if (item instanceof Set) {
      const copy = new Set();
 
      item.forEach(v => copy.add(_cloneDeep(v))); // eslint-disable-line @typescript-eslint/no-unsafe-argument
 
      return copy;
    }
    if (item instanceof Map) {
      const copy = new Map();
 
      item.forEach((v, k) => copy.set(k, _cloneDeep(v))); // eslint-disable-line @typescript-eslint/no-unsafe-argument
 
      return copy;
    }
    if (item instanceof Object) {
      const copy: Indexed = {};
      Object.getOwnPropertySymbols(item).forEach(s => (copy[s.toString()] = _cloneDeep(item[s.toString()]))); // eslint-disable-line @typescript-eslint/no-unsafe-argument
      Object.keys(item).forEach(k => (copy[k] = _cloneDeep(item[k]))); // eslint-disable-line @typescript-eslint/no-unsafe-argument
 
      return copy;
    }
 
    throw new Error(`Unable to copy object: ${item}`);
  })(obj);
}
