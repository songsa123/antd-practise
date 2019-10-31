import React, { Component } from 'react';
import { Card } from 'antd';
class Canvas extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.draw();
        this.drawSan();
        this.drawHu();
        this.dranDian();
        this.drawSaiBeiEr();
    }
    draw() {
        var canvas = document.getElementById('tutorial');
        var canvas = document.getElementById('tutorial');
        if (!canvas.getContext) return;
        var ctx = canvas.getContext("2d");
        ctx.beginPath(); //新建一条path
        ctx.moveTo(50, 50); //把画笔移动到指定的坐标
        ctx.lineTo(200, 50);  //绘制一条从当前位置到指定坐标(200, 50)的直线.
        //闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
        ctx.closePath();
        ctx.stroke(); //绘制路径。
    }
    drawSan() {
        var canvas = document.getElementById('san');
        if (!canvas.getContext) return;
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(200, 50);
        ctx.lineTo(200, 200);
        ctx.closePath(); //虽然我们只绘制了两条线段，但是closePath会closePath，仍然是一个3角形
        // 绘制三角形
        // ctx.stroke(); //描边。stroke不会自动closePath()
        // 填充三角形
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fill(); //填充闭合区域。如果path没有闭合，则fill()会自动闭合路径

    }
    // 绘制圆弧
    drawHu() {
        var canvas = document.getElementById('hu');
        if (!canvas.getContext) return;
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(50, 50, 40, 0, Math.PI / 2, false);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(150, 150, 40, 0, Math.PI, false);
        ctx.fill();


    }
    dranDian() {
        // 控制点
        var canvas = document.getElementById('dian');
        if (!canvas.getContext) return;
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(50, 50);
        //参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数4：圆弧半径
        ctx.arcTo(200, 50, 200, 200, 100);
        ctx.lineTo(200, 200)
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(50, 50, 10, 10);
        ctx.rect(200, 50, 10, 10)
        ctx.rect(200, 200, 10, 10)
        ctx.fill()
    }
    // 赛贝尔曲线
    drawSaiBeiEr() {
        var canvas = document.getElementById('sai');
        if (!canvas.getContext) return;
        var ctx = canvas.getContext("2d");
        // ctx.beginPath();
        // ctx.moveTo(10, 200); //起始点
        // var cp1x = 40, cp1y = 100;  //控制点  坐标
        // var x = 200, y = 200; // 结束点 坐标
        // //绘制二次贝塞尔曲线
        // ctx.quadraticCurveTo(cp1x, cp1y, x, y);
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.rect(10, 200, 10, 10);
        // ctx.rect(cp1x, cp1y, 10, 10);
        // ctx.rect(x, y, 10, 10);
        // ctx.fillStyle='#f00'
        // ctx.fill();


        ctx.beginPath();
    ctx.moveTo(40, 200); //起始点
    var cp1x = 20, cp1y = 100;  //控制点1
    var cp2x = 100, cp2y = 120;  //控制点2
    var x = 200, y = 200; // 结束点
    //绘制三次贝塞尔曲线
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    ctx.stroke();
 
    ctx.beginPath();
    ctx.rect(40, 200, 10, 10);
    ctx.rect(cp1x, cp1y, 10, 10);
    ctx.rect(cp2x, cp2y, 10, 10);
    ctx.rect(x, y, 10, 10);
    ctx.fill();
    }
    /**
     * https://www.runoob.com/w3cnote/html5-canvas-intro.html
     */

    render() {
        return (
            <Card>
                <canvas id="tutorial" width="300" height="100"></canvas>
                <canvas id='san' width='300' height='300'></canvas>
                <canvas id='hu' width='300' height='300'></canvas>
                <canvas id='dian' width='300' height='300'></canvas>
                <canvas id='sai' width='300' height='300'></canvas>


            </Card>
        );
    }
}

export default Canvas;