export let wasm_bindgen;
(function () {
  const __exports = {};
  let wasm;

  let cachedUint8Memory0 = new Uint8Array();

  function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
      cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
  }

  let WASM_VECTOR_LEN = 0;

  function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
  }
  /**
   * @param {Uint8Array} metadata_bytes
   * @returns {number}
   */
  __exports.init_pagefind = function (metadata_bytes) {
    const ptr0 = passArray8ToWasm0(metadata_bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.init_pagefind(ptr0, len0);
    return ret;
  };

  /**
   * @param {number} ptr
   * @param {Uint8Array} chunk_bytes
   * @returns {number}
   */
  __exports.load_index_chunk = function (ptr, chunk_bytes) {
    const ptr0 = passArray8ToWasm0(chunk_bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.load_index_chunk(ptr, ptr0, len0);
    return ret;
  };

  /**
   * @param {number} ptr
   * @param {Uint8Array} chunk_bytes
   * @returns {number}
   */
  __exports.load_filter_chunk = function (ptr, chunk_bytes) {
    const ptr0 = passArray8ToWasm0(chunk_bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.load_filter_chunk(ptr, ptr0, len0);
    return ret;
  };

  const cachedTextEncoder = new TextEncoder("utf-8");

  const encodeString =
    typeof cachedTextEncoder.encodeInto === "function"
      ? function (arg, view) {
          return cachedTextEncoder.encodeInto(arg, view);
        }
      : function (arg, view) {
          const buf = cachedTextEncoder.encode(arg);
          view.set(buf);
          return {
            read: arg.length,
            written: buf.length,
          };
        };

  function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
      const buf = cachedTextEncoder.encode(arg);
      const ptr = malloc(buf.length);
      getUint8Memory0()
        .subarray(ptr, ptr + buf.length)
        .set(buf);
      WASM_VECTOR_LEN = buf.length;
      return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
      const code = arg.charCodeAt(offset);
      if (code > 0x7f) break;
      mem[ptr + offset] = code;
    }

    if (offset !== len) {
      if (offset !== 0) {
        arg = arg.slice(offset);
      }
      ptr = realloc(ptr, len, (len = offset + arg.length * 3));
      const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
      const ret = encodeString(arg, view);

      offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
  }
  /**
   * @param {number} ptr
   * @param {string} filter
   * @returns {number}
   */
  __exports.add_synthetic_filter = function (ptr, filter) {
    const ptr0 = passStringToWasm0(
      filter,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.add_synthetic_filter(ptr, ptr0, len0);
    return ret;
  };

  let cachedInt32Memory0 = new Int32Array();

  function getInt32Memory0() {
    if (cachedInt32Memory0.byteLength === 0) {
      cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
  }

  const cachedTextDecoder = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true,
  });

  cachedTextDecoder.decode();

  function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
  }
  /**
   * @param {number} ptr
   * @param {string} query
   * @returns {string}
   */
  __exports.request_indexes = function (ptr, query) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(
        query,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      const len0 = WASM_VECTOR_LEN;
      wasm.request_indexes(retptr, ptr, ptr0, len0);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  };

  /**
   * @param {number} ptr
   * @param {string} filters
   * @returns {string}
   */
  __exports.request_filter_indexes = function (ptr, filters) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(
        filters,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      const len0 = WASM_VECTOR_LEN;
      wasm.request_filter_indexes(retptr, ptr, ptr0, len0);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  };

  /**
   * @param {number} ptr
   * @returns {string}
   */
  __exports.request_all_filter_indexes = function (ptr) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.request_all_filter_indexes(retptr, ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  };

  /**
   * @param {number} ptr
   * @returns {string}
   */
  __exports.filters = function (ptr) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.filters(retptr, ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  };

  /**
   * @param {number} ptr
   * @param {string} query
   * @param {string} filter
   * @param {string} sort
   * @param {boolean} exact
   * @returns {string}
   */
  __exports.search = function (ptr, query, filter, sort, exact) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(
        query,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      const len0 = WASM_VECTOR_LEN;
      const ptr1 = passStringToWasm0(
        filter,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      const len1 = WASM_VECTOR_LEN;
      const ptr2 = passStringToWasm0(
        sort,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      const len2 = WASM_VECTOR_LEN;
      wasm.search(retptr, ptr, ptr0, len0, ptr1, len1, ptr2, len2, exact);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  };

  async function load(module, imports) {
    if (typeof Response === "function" && module instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === "function") {
        try {
          return await WebAssembly.instantiateStreaming(module, imports);
        } catch (e) {
          if (module.headers.get("Content-Type") != "application/wasm") {
            console.warn(
              "`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
              e,
            );
          } else {
            throw e;
          }
        }
      }

      const bytes = await module.arrayBuffer();
      return await WebAssembly.instantiate(bytes, imports);
    } else {
      const instance = await WebAssembly.instantiate(module, imports);

      if (instance instanceof WebAssembly.Instance) {
        return { instance, module };
      } else {
        return instance;
      }
    }
  }

  function getImports() {
    const imports = {};
    imports.wbg = {};

    return imports;
  }

  function initMemory(imports, maybe_memory) {}

  function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = new Int32Array();
    cachedUint8Memory0 = new Uint8Array();

    return wasm;
  }

  function initSync(module) {
    const imports = getImports();

    initMemory(imports);

    if (!(module instanceof WebAssembly.Module)) {
      module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
  }

  async function init(input) {
    if (typeof input === "undefined") {
      let src;
      if (typeof document === "undefined") {
        src = location.href;
      } else {
        src = document.currentScript.src;
      }
      input = src.replace(/\.js$/, "_bg.wasm");
    }
    const imports = getImports();

    if (
      typeof input === "string" ||
      (typeof Request === "function" && input instanceof Request) ||
      (typeof URL === "function" && input instanceof URL)
    ) {
      input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
  }

  wasm_bindgen = Object.assign(init, { initSync }, __exports);
})();
