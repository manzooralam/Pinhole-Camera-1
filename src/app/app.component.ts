import { Component,OnInit } from '@angular/core';

import {fabric} from 'fabric';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'Pinhole';
    canvas: any;
    value: any;
    size: { width: number; height: number; };
    box: { width: number; height: number; };
    textToDisplay: string;
    invertedBottom2: number;
    invertedBottom1: number;
    invertedY2: number;
    objectCircleRadius: number;
    invertedY1: number;
    objectHeight: number;
    objectDistance: number;
    appertureWidth: number;
    displayBox: any;
    objectBody: any;
    objectHead: any;
    pinholeLine: any;
    appertureWord: any;
    pinhole: any;
    firstMessage: any;
    objectWord: any;
    screenWord: any;
    myModel: number;
    constructor() {
      this.myModel = 0,
      this.appertureWidth=.25,
      this.objectDistance=400,
      this.objectHeight=50,
      this.objectCircleRadius=10,
      this.invertedY1=0,
      this.invertedY2=0,
      this.invertedBottom1=0,
      this.invertedBottom2=0,
      this.textToDisplay="Hi! Change the aperture size.",
    this.box={width:200,height:150},
    this.size={width:450,height:190}}
  
    ngOnInit(): void {
      this.canvas = new fabric.Canvas('c',{hoverCursor:"pointer",
      selection:!0,
      backgroundColor:"#339933",
      selectionBorderColor:"blue",
      });
      this.canvas.setWidth(this.size.width),
      this.canvas.setHeight(this.size.height);
      this.canvas.renderAll();
  
  this.displayBox=new fabric.Rect({
  left:20,top:20,fill:"black",width:this.box.width,height:this.box.height,selectable:!1,hasControls:!1,hasBorders:!1});
  this.canvas.add(this.displayBox);
  
  this.objectBody=new fabric.Line([
  this.objectDistance+20,(this.box.height-this.objectHeight)/2+20,this.objectDistance+20,(this.box.height+this.objectHeight)/2+20],
  {stroke:"red",strokeWidth:2,selectable:!1,evented:!1,fill:"red"});
  this.canvas.add(this.objectBody);
  
  this.objectHead=new fabric.Circle({
  radius:this.objectCircleRadius,left:this.objectDistance+20-this.objectCircleRadius,
  top:(this.box.height-this.objectHeight)/2+20-this.objectCircleRadius,stroke:"red",
  fill:"white",opacity:.4,selectable:!1,strokeWidth:2});
  this.canvas.add(this.objectHead);
  
  this.pinholeLine=new fabric.Line([
  this.box.width+19,(this.box.height-this.appertureWidth)/2+20,this.box.width+19,
  (this.box.height+this.appertureWidth)/2+20],{stroke:"black",strokeWidth:4,selectable:!1,evented:!1,fill:"black"});
  this.canvas.add(this.pinholeLine);
  
  this.pinhole=new fabric.Circle({
  radius:6,left:this.box.width+19-6,top:(this.box.height-this.appertureWidth)/2+20-6,
  stroke:"red",fill:"white",opacity:.9,selectable:!1,strokeWidth:1});
  this.canvas.add(this.pinhole);
  
  this.firstMessage=new fabric.Textbox(
  this.textToDisplay,{width:200,height:100,top:this.box.height-20,
  left:this.box.width+30,hasControls:!1,fontSize:16,selectable:!1});
  this.canvas.add(this.firstMessage);
  
  this.appertureWord=new fabric.Text("Aperture",{
  left:this.box.width+20,top:(this.box.height-this.objectHeight)/2-5,fill:"#5607f2",fontSize:14});
  this.canvas.add(this.appertureWord);
  
  this.objectWord=new fabric.Text("Object",{
  left:this.objectDistance+8,top:(this.box.height-this.objectHeight)/2-5,fill:"#5607f2",fontSize:14});
  this.canvas.add(this.objectWord);
  
  this.screenWord=new fabric.Text("Screen",{left:25,top:(this.box.height-this.objectHeight)/2-5,fill:"#5607f2",fontSize:14});
  this.canvas.add(this.screenWord);
    this.calculateInvertedTop();
    }
  
    onIncreaseApperture(): void
      {this.displayBox=this.canvas.getObjects("text");for(let pinholeLine in this.displayBox)"black"!=this.displayBox[pinholeLine].get("fill")&&this.canvas.remove(this.displayBox[pinholeLine]);
      this.objectBody=this.canvas.getObjects("line");for(let pinholeLine in this.objectBody)"red"!=this.objectBody[pinholeLine].get("fill")&&this.canvas.remove(this.objectBody[pinholeLine]);
      this.objectHead=this.canvas.getObjects("circle");for(let pinholeLine in this.objectHead)"red"!=this.objectHead[pinholeLine].get("stroke")&&this.canvas.remove(this.objectHead[pinholeLine]);
      this.appertureWidth=this.appertureWidth+0.25,this.calculateInvertedTop(),this.drawApperture(),
      this.textToDisplay="Aperture size (in px): "+this.appertureWidth+" Trace the edges and the image.",this.displayMessage()
    }
  
    onDecreaseApperture(): void{
      this.displayBox=this.canvas.getObjects("text");for(let pinholeLine in this.displayBox)"black"!=this.displayBox[pinholeLine].get("fill")&&this.canvas.remove(this.displayBox[pinholeLine]);
      this.objectBody=this.canvas.getObjects("line");for(let pinholeLine in this.objectBody)"red"!=this.objectBody[pinholeLine].get("fill")&&this.canvas.remove(this.objectBody[pinholeLine]);
      this.objectHead=this.canvas.getObjects("circle");for(let pinholeLine in this.objectHead)"red"!=this.objectHead[pinholeLine].get("stroke")&&this.canvas.remove(this.objectHead[pinholeLine]);
    this.appertureWidth>=0.5&&(this.appertureWidth=this.appertureWidth-0.25),this.calculateInvertedTop(),this.drawApperture(),
    this.textToDisplay="Aperture size (in px): "+this.appertureWidth+" Trace the edges and the image.",this.displayMessage()
    }
  
    drawApperture(): void{
      this.displayBox=new fabric.Line([this.box.width+19,(this.box.height-this.appertureWidth)/2+20,this.box.width+19,
    (this.box.height+this.appertureWidth)/2+20],{stroke:"black",strokeWidth:2,selectable:!1,evented:!1,fill:"black"});
    this.canvas.add(this.displayBox)}
  
    drawInvertedObject(): void{
      var displayBox,objectBody=this.canvas.getObjects("text");for(let objectWord in objectBody)"black"!=objectBody[objectWord].get("fill")&&objectBody[objectWord].animate({left:800},
      {onChange:this.canvas.renderAll.bind(this.canvas)});
      displayBox=this.invertedY1-this.invertedY2;
      var objectHead=50+4*(this.invertedY1-this.invertedY2),
      pinholeLine="HSL(0,100%,"+objectHead+"%)";
  
      for(let objectWord=0;objectWord<this.invertedY1-this.invertedY2;objectWord+=5)
      { this.pinhole = new fabric.Line([20,this.invertedY1-objectWord,20,this.invertedY1-objectWord],{stroke:pinholeLine,strokeWidth:displayBox,selectable:!1,
        evented:!1,fill:pinholeLine});
      this.canvas.add(this.pinhole),this.pinhole.animate({x2:20,y2:this.invertedY1-objectWord-this.objectHeight},
      {onChange:this.canvas.renderAll.bind(this.canvas),duration:1e3})}
      this.firstMessage="Try changing the aperture";objectHead>=80&&(this.firstMessage="What Changed?"),displayBox<1&&(this.firstMessage="Is the image quite faint?");
      this.appertureWord=new fabric.Text(this.firstMessage,{left:this.box.width+40,top:this.box.height,fill:"white",fontSize:14});
      this.canvas.add(this.appertureWord)}
  
   calculateInvertedTop(): void{
    this.displayBox=(this.box.height-this.objectHeight)/2+20,
    this.objectBody=(this.box.height+this.objectHeight)/2+20,
    this.objectHead=this.objectHeight,this.pinholeLine=this.appertureWidth,this.pinhole=this.objectDistance,
    this.firstMessage=this.objectDistance-this.box.width;
    this.invertedY1=this.displayBox+(this.objectHead+this.pinholeLine)/(2*this.firstMessage)*this.pinhole,this.invertedY2=this.displayBox+(this.objectHead-this.pinholeLine)/(2*this.firstMessage)*this.pinhole,
  this.invertedBottom1=this.objectBody-(this.objectHead+this.pinholeLine)/(2*this.firstMessage)*this.pinhole,
  this.invertedBottom2=this.objectBody-(this.objectHead-this.pinholeLine)/(2*this.firstMessage)*this.pinhole;
  }
  
  
   drawRayBoundry(): void{
    this.displayBox=this.objectDistance+20,
    this.objectBody=(this.box.height-this.objectHeight)/2+20,
    this.objectHead=(this.box.height+this.objectHeight)/2+20;
  
    this.pinholeLine=new fabric.Line([this.displayBox,this.objectBody,this.displayBox,this.objectBody],
     {stroke:"orange",strokeWidth:0,selectable:!1,evented:!1,fill:"orange"});
     this.canvas.add(this.pinholeLine);
     this.pinholeLine.animate({x2:20,y2:this.invertedY1,strokeWidth:.5},
      {onChange:this.canvas.renderAll.bind(this.canvas),duration:1e3});
      this.pinhole=new fabric.Line([this.displayBox,this.objectBody,this.displayBox,this.objectBody],{stroke:"orange",strokeWidth:0,selectable:!1,evented:!1,fill:"orange"});
    this.canvas.add(this.pinhole);
    this.pinhole.animate({x2:20,y2:this.invertedY2,strokeWidth:.5},
      {onChange:this.canvas.renderAll.bind(this.canvas),duration:1e3});
      this.firstMessage=new fabric.Line([this.displayBox,this.objectHead,this.displayBox,this.objectHead],{stroke:"orange",strokeWidth:1,selectable:!1,evented:!1,fill:"orange"});
    this.canvas.add(this.firstMessage);
    this.firstMessage.animate({x2:20,y2:this.invertedBottom1,strokeWidth:.5},
      {onChange:this.canvas.renderAll.bind(this.canvas),duration:1e3});
      this.appertureWord=new fabric.Line([this.displayBox,this.objectHead,this.displayBox,this.objectHead],{stroke:"orange",strokeWidth:1,selectable:!1,evented:!1,fill:"orange"});
    this.canvas.add(this.appertureWord);
    this.appertureWord.animate({x2:20,y2:this.invertedBottom2,strokeWidth:.5},
    {onChange:this.canvas.renderAll.bind(this.canvas),duration:1e3});
     new fabric.Text("Top1",{left:22,top:this.invertedY1,fill:"blue",fontSize:10});
     new fabric.Text("Top2",{left:22,top:this.invertedY2-10,fill:"blue",fontSize:10});
     
         
             
  this.textToDisplay="Will the image of the object be formed at the top?";
  this.displayMessage();}
  
   fillRayBoundry(): void{
    this.displayBox=this.objectDistance+20,
    this.objectBody=(this.box.height-this.objectHeight)/2+20,
    this.objectHead=(this.box.height+this.objectHeight)/2+20;
     for(let firstMessage=0;firstMessage<this.invertedY1-this.invertedY2;firstMessage++)
     {this.pinholeLine=new fabric.Line([this.displayBox,this.objectBody,this.displayBox,this.objectBody],{stroke:"orange",strokeWidth:0,selectable:!1,evented:!1,fill:"orange"});
     this.canvas.add(this.pinholeLine),this.pinholeLine.animate({x2:20,y2:this.invertedY1-firstMessage,strokeWidth:.5},
         {onChange:this.canvas.renderAll.bind(this.canvas),duration:2e3})}
         for(let firstMessage=0;firstMessage<this.invertedBottom2-this.invertedBottom1;firstMessage++)
         {this.pinhole=new fabric.Line([this.displayBox,this.objectHead,this.displayBox,this.objectHead],{stroke:"orange",strokeWidth:0,selectable:!1,evented:!1,fill:"orange"});
         this.canvas.add(this.pinhole),this.pinhole.animate({x2:20,y2:this.invertedBottom2-firstMessage,strokeWidth:.5},
             {onChange:this.canvas.renderAll.bind(this.canvas),duration:2e3})}
             new fabric.Text("Top1",{left:22,top:this.invertedY1,fill:"blue",fontSize:10}),
             new fabric.Text("Top2",{left:22,top:this.invertedY2-10,fill:"blue",fontSize:10}),
             new fabric.Text("Bottom2",{left:22,top:this.invertedBottom2,fill:"blue",fontSize:10}),
             new fabric.Text("Bottom1",{left:22,top:this.invertedBottom1-10,fill:"blue",fontSize:10})
    }
  
   drawImage(): void{
    this.displayBox=1;
    this.invertedY1-this.invertedY2<1&&(this.displayBox=.5),
     this.invertedY1-this.invertedY2==1&&(this.displayBox=.8);
     for(let pinholeLine=0;pinholeLine<this.invertedY1-this.invertedY2;pinholeLine+=1)
     {this.objectBody=new fabric.Line([20,this.invertedY1-pinholeLine,20,this.invertedBottom2-pinholeLine],
         {stroke:"orange",strokeWidth:this.displayBox,selectable:!1,evented:!1,fill:"orange",opacity:.4}),
         this.objectHead=new fabric.Circle({radius:this.objectCircleRadius,left:20-this.objectCircleRadius,
             top:this.invertedY1-pinholeLine-this.objectCircleRadius,stroke:"orange",fill:"white",opacity:.3,strokeWidth:this.displayBox});
         this.canvas.add(this.objectBody),this.canvas.add(this.objectHead)}
         this.textToDisplay="Will the image change if you change the aperture?",this.displayMessage()}
  
  displayMessage(): void{
     this.canvas.getObjects("textbox")[0].set("text",this.textToDisplay)}
  
  updateSlider(event: any){
     console.log("got into slider: ",this.value);
     this.appertureWidth=this.value;
     this.objectBody=this.canvas.getObjects("text");
     for(let pinhole in this.objectBody)"black"!=this.objectBody[pinhole].get("fill")&&this.canvas.remove(this.objectBody[pinhole]);
     this.objectHead=this.canvas.getObjects("line");for(let pinhole in this.objectHead)"red"!=this.objectHead[pinhole].get("fill")&&this.canvas.remove(this.objectHead[pinhole]);
     this.pinholeLine=this.canvas.getObjects("circle");for(let pinhole in this.pinholeLine)"red"!=this.pinholeLine[pinhole].get("stroke")&&this.canvas.remove(this.pinholeLine[pinhole]);
     this.calculateInvertedTop(),
     this.drawApperture(),
     this.textToDisplay="Aperture size (in px): "+this.appertureWidth+" Check the Ray Diagram.",this.displayMessage()}
  }
  
  