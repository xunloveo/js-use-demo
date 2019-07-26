// 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全，接口提示等功能

/*
  declare var 声明全局变量
  declare function 声明全局方法
  declare class 声明全局类
  declare enum 声明全局枚举类型
  declare namespace 声明(含有子属性的)全局对象
  interface 和 type 声明全局类型
  export 导出变量
  export namespace 导出(含有子属性的)全局对象
  export default es6默认导出
  export = commonjs 导出模块
  export as namespace UMD库声明全局变量
  declare global 扩展全局变量
  declare module 扩展模块
  /// <reference /> 三斜线指令
*/

// 使用jQuery
declare var jQuery: (selctor: string) => any
jQuery('#foo') // 编译的结果 为 jQuery('#foo')

// 什么是声明文件
/**
 * 通常我们会把声明语句放到一个单独的文件(以.d.ts结尾 如 jQuery.d.ts)
 */

// src/jQuery.d.ts
declare var jQuery: (selctor: string) => any

// src/index.ts
jQuery('#foo')

// 第三方库 使用@types 方式
// npm install @types/jquery --save-dev


