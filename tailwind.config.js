const c = (v) => `rgb(var(--${v}) / <alpha-value>)`
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: c('ink'),
        panel: c('panel'),
        line: c('line'),
        bone: c('bone'),
        mute: c('mute'),
        volt: c('volt'),
        onvolt: c('onvolt'),
      },
    },
  },
  plugins: [],
}
