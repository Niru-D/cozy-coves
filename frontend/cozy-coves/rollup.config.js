// rollup.config.js

export default {
    input: 'src/main.jsx', 
    output: {
      file: 'dist/bundle.js', 
      format: 'cjs', 
    },
    external: [
      '/config.js', 
    ],
    
  };
  