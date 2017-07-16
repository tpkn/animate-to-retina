/*!
 * Animate to Retina (v1.0.4.20150216), http://tpkn.me/
 */

fl.showIdleMessage(false);
fl.outputPanel.clear();


var dom = fl.getDocumentDOM();
var timeline = dom.getTimeline();
var selected_list = dom.selection;

var config_file = fl.configURI + 'animate-to-retina.cfg';
var export_folder = '';


/**
 * Get exporting folder from config file
 * If config file does not exist, create it and show folder selection window
 * @return {String}
 */
function getFolder(){
   if(!FLfile.exists(config_file)){
      export_folder = fl.browseForFolderURL('Select folder');
      FLfile.write(config_file, export_folder);
   }else{
      export_folder = FLfile.read(config_file);
   }
   
   return export_folder;
}


/**
 * Manual folder selection
 */
function setFolder(){
   export_folder = fl.browseForFolderURL('Select folder');
   FLfile.write(config_file, export_folder);
}


/**
 * Exporter stuff...
 * @param  {Object} source_item
 */
function exportForRetina(source_item){
   var doc = fl.createDocument();
   var dom = fl.getDocumentDOM();
   var timeline = dom.getTimeline();
   
   /**
    * Copy object into a new document
    */
   doc.addItem({x:0, y:0}, source_item.libraryItem);
   
   /**
    * Copy original's properties (rotation, skew and else)
    */
   var clone_item = dom.selection[0];
   clone_item.rotation = source_item.rotation;
   clone_item.skewX = source_item.skewX;
   clone_item.skewY = source_item.skewY;
   clone_item.transformX = source_item.transformX;
   clone_item.transformY = source_item.transformY;

   /**
    * Wrap object with new movieclip to get nice bounds and pivot point at 0,0
    */
   dom.library.selectItem(source_item.libraryItem.name, false);
   dom.convertToSymbol('movie clip', 'temp_mc', 'top left');
   dom.setTransformationPoint({x:0, y:0});
   
   /**
    * Resize and position our object
    */
   var padding = 10;
   var x2_width = source_item.width * 2;
   var x2_height = source_item.height * 2;
   
   clone_item = dom.selection[0];
   clone_item.width = x2_width;
   clone_item.height = x2_height;
   clone_item.x = padding;
   clone_item.y = padding;
   
   /**
    * Lock main layer
    */
   timeline.layers[0].locked = true;

   /**
    * Add transparent rectangle 20px wider and longer than exporting item
    * If padding < 4, some elements would be cutted on sides
    */
   timeline.currentLayer = timeline.layers.length - 1;
   timeline.addNewLayer('stretch', 'normal', false);
   dom.addNewRectangle({left: 0, top: 0, right: x2_width + padding * 2, bottom: x2_height + padding * 2},0, false, true);
   dom.selectAll();
   dom.setFillColor('#ffffff00');
   dom.selectAll(false);
   
   /**
    * Save png
    */
   var filename = source_item.libraryItem.name.replace(/\.(jpe?g|png|bmp|gif)$/i, '').toLowerCase().replace(/\W/gi, '') + '_' + source_item.width + 'x' + source_item.height + '_' + (Math.floor(Math.random() * 1e8).toString(16).substring(1));
   doc.exportPNG(export_folder + '/' + filename + '.png', true, false);
   
   /**
    * Close temp document
    */
   fl.closeDocument(doc, false);
}


function run(){
   export_folder = getFolder();

   for(var i = 0, len = selected_list.length; i < len; i++){
      var item = selected_list[i];
      if(item.libraryItem == null){
         fl.outputPanel.clear();
         return fl.trace('(!) This is not a movieclip, graphic, button or bitmap and can not be exported');
      }
      
      exportForRetina(item);
   }
}