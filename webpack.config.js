const path = require('path');

module.exports = {
  entry: './src/index.js', // 엔트리 포인트 설정
  output: {
    filename: 'bundle.js', // 출력 파일명
    path: path.resolve(__dirname, 'dist'), // 출력 경로
  },
  module: {
    rules: [
      {
        test: /\.js$/, // .js 확장자를 가진 모든 파일에 대해
        exclude: /node_modules\/(?!chart\.js)/, // node_modules 중 chart.js를 제외하고 나머지는 제외
        use: {
          loader: 'babel-loader', // babel-loader 사용
          options: {
            presets: ['@babel/preset-env'], // 최신 JavaScript 변환
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'], // 확장자 생략 가능하게 설정
  },
  mode: 'development', // 개발 모드 설정
};
