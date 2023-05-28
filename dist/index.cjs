'use strict';

const compilerSfc = require('@vue/compiler-sfc');
const MagicString = require('magic-string');

function _interopDefaultLegacy(e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const MagicString__default = /*#__PURE__*/_interopDefaultLegacy(MagicString);

function extractPathFromFilePath(filePath) {
    const regex = /\/pages(.+)\.vue/;
    const matches = filePath.match(regex);

    if (matches && matches[1]) {
        return matches[1];
    }

    return null; // 如果没有匹配到，则返回 null 或者你认为合适的默认值
}
function supportScriptName(code, id) {
    let s;
    const str = () => s || (s = new MagicString__default(code));
    const { descriptor } = compilerSfc.parse(code);
    if (!descriptor.script && descriptor.scriptSetup) {
        const result = compilerSfc.compileScript(descriptor, { id });
        const name = result.attrs.name;
        const lang = result.attrs.lang;
        if (name) {
            str().appendLeft(0, `<script ${lang ? `lang="${lang}"` : ""}>
import { defineComponent } from 'vue'
export default defineComponent({
  name: '${name}',
})
<\/script>
`);
        } else {
            const path = extractPathFromFilePath(id)
            if (path) {
                str().appendLeft(0, `<script ${lang ? `lang="${lang}"` : ""}>
import { defineComponent } from 'vue'
export default defineComponent({
    name: '${path.replace(/\/index$/, '')}',
})
<\/script>
`);
            }
        }
        return {
            map: str().generateMap(),
            code: str().toString()
        };
    } else {
        return null;
    }
}

const index = (options = {}) => {
    return {
        name: "vite:setup-name-support",
        enforce: "pre",
        async transform(code, id) {
            if (!/\.vue$/.test(id)) {
                return null;
            }
            const { name = true } = options;
            if (name) {
                return supportScriptName.call(this, code, id);
            }
            return null;
        }
    };
};

module.exports = index;
