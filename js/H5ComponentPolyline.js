/**
 * Created by 夏天亦温暖 on 2017/11/6.
 */
/**
 * Created by 夏天亦温暖 on 2017/11/6.
 */
//折线图表对象
var H5ComponentPolyline=function(name,cfg){
    var component=new H5ComponentBase(name,cfg);


    var w=cfg.width;
    var h=cfg.height;


    //todo 加入一个画布，背景层
    var cns=document.createElement('canvas');
    var ctx=cns.getContext('2d');
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    component.append(cns);

    //todo 水平网格线，100份 10份
    var step=10;
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.strokeStyle='#aaa';

    window.ctx=ctx;
    //todo 水平网格线，根据内容高度来划分
    for(var i=0;i<step+1;i++){
        var y=(h/step)*i;
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);
    }

    //todo 垂直网格线，根据项目的个数划分
    step=cfg.data.length+1;
    var text_w=w/step>>0;


    for(var i=0;i<step+1;i++){
        var x=w/step*i;
        ctx.moveTo(x,0);
        ctx.lineTo(x,h);

        if(cfg.data[i]){
            var text=$('<div class="text">');
            text.text(cfg.data[i][0]);
            text.css('width',text_w/2).css('left',x/2+text_w/4);
            component.append(text);
        }

    }
    ctx.stroke();

    //todo 加入画布 绘制折线数据
    var cns=document.createElement('canvas');
    var ctx=cns.getContext('2d');
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    component.append(cns);




    //todo 绘制折线以及对应的数据和阴影
    //todo per 会根据这个值绘制出最终数据对应的中间状态
    //todo return
    var draw=function(per){
        ctx.clearRect(0,0,w,h);
    ctx.beginPath();
    ctx.lineWidth=3;
    ctx.strokeStyle='#ff8878';

    var x=0;
    var y=0;
    //ctx.moveTo(10,10);
    //ctx.arc(10,10,5,0,2*Math.PI);

    var row_w=(w/(cfg.data.length+1));

    //todo 画点
    for(i in cfg.data){
        var item=cfg.data[i];
        x=row_w*i+row_w;
        y=h-item[1]*h*per;
        ctx.moveTo(x,y);
        ctx.arc(x,y,5,0,2*Math.PI);
    }

    //todo 连线
    //todo 移动画笔到第一个点的点位
    ctx.moveTo(row_w,h-(cfg.data[0][1]*h*per));
    for(i in cfg.data){
        var item=cfg.data[i];
        x=row_w * i+row_w;
        y=h-item[1]*h*per;
        ctx.lineTo(x,y);
    }
    ctx.stroke();
    //todo 绘制阴影

    ctx.lineWidth=1;

    ctx.lineTo(x,h);
    ctx.lineTo(row_w,h);
    ctx.fillStyle='rgba(255,136,120,0.2)';
    ctx.fill();


//todo 写数据

    for(i in cfg.data){
        var item=cfg.data[i];
        x=row_w*i+row_w;
        y=h-item[1]*h*per;
        ctx.fillStyle=item[2]?item[2]:'#595959';
        ctx.fillText((item[1]*100>>0)+'%', x-10,y-10);
    }

    ctx.stroke();


};
    draw(1);


    component.on('onLoad',function(){
        //todo 折线图生长动画
        var s=0;
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10)
        }

    });

    component.on('onLeave',function(){
        //todo 折线图生长动画
        var s=1;
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                draw(s);
            },i*10+500)
        }

    });

    return component;




};
