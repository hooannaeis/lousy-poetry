<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :stroke="iconColor" :fill="iconFillColor" :stroke-width="strokeWidth">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: "box"
    },
    viewBox: {
      type: String,
      default: "0 0 48 48"
    },
    width: {
      type: [Number, String],
      default: "100%"
    },
    height: {
      type: [Number, String],
      default: "100%"
    },
    iconColor: {
      type: String,
    },
    strokeWidth: {
      type: String,
    },
    iconFillColor: {
      type: String,
    }
  }
};
</script>
