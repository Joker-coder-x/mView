<script>
import { TYPE_LIST, FLEX_JUSTIFY_VALUES, FLEX_ALIGN_VALUES } from "./types.js";

export default {
  name: "MRow",

  props: {
    type: {
      type: String,
      default: TYPE_LIST[0],
      validator(value) {
        return TYPE_LIST.indexOf(value) !== -1;
      }
    },
    //渲染的标签名
    tag: {
      type: String,
      default: "div"
    },
    //栅格布局下 栅格的间隔
    gutter: {
      type: Number,
      default: 0
    },
    //flex布局下主轴的对其方式
    justify: {
      type: String,
      default: "start",
      validator(value) {
        return FLEX_JUSTIFY_VALUES.indexOf(value) !== -1;
      }
    },
    //flex布局下交叉轴的对齐方式
    align: {
      type: String,
      default: "start",
      validator(value) {
        return FLEX_ALIGN_VALUES.indexOf(value) !== -1;
      }
    }
  },

  computed: {
    getStyle() {
      const style = {};

      if (this.gutter) {
        style.marginLeft = this.gutter / -2 + "px";
        style.marginRight = style.marginLeft;
      }

      return style;
    }
  },

  render(h) {
    return h(
      this.tag,
      {
        class: [
          "m-row",
          this.type === TYPE_LIST[1]
            ? `is-justify-${this.justify} is-align-${this.align}`
            : ""
        ],
        style: this.getStyle
      },
      this.$slots.default
    );
  }
};
</script>
