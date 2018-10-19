> ### 1. link和@import有什么区别？
相同的地方，都是外部引用CSS方式，区别：
* link是html标签，除了加载css外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS
* link引用CSS时候，页面载入时同时加载；@import需要在页面完全加载以后加载，而且@import被引用的CSS会等到引用它的CSS文件被加载完才加载。所以有时候浏览@import加载CSS的页面时开始会闪烁
* link无兼容问题；@import是在css2.1提出来的，低版本的浏览器不支持
* link支持使用javascript控制去改变样式，而@import不支持.当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的。
> 建议最好不要使用@improt，如果@import加载的样式比较大，出现加载延迟，就可能会发生闪屏的问题