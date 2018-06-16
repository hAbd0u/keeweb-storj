/**
 * KeeWeb plugin: Storj Decenterlized
 * @author Beladel Ilyes Aabdelrazak & Katouache Tarek
 * @license MIT
 */

const Storage = require('storage/index');
const BaseLocale = require('locales/base');
const StorageBase = require('storage/storage-base');
//const StorjModule = require('storj');
var storj;

const StorjDecenterlized = StorageBase.extend({
    name: 'StorjSync',
    enabled: true,
    uipos: 100,
    iconSvg: 
        	 '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1782 2000" width="128" height="128"><g fill="#2683ff" transform="translate(-100)">,' +
        	 '<path d="M275.47 1360.1a54.69 54.69 0 1 0 54.69 54.69c0-9.7-2.65-18.52-7.06-27.34a55.55 55.55 0 0 0 -47.63 -27.34M1048.13 170.23a54.69 54.69' + 
        	 '0 1 0 -54.69 54.69A55 55 0 0 0 1048.13 170.23M1715 644.77a54.69 54.69 0 1 0 -54.69 -54.69 53.88 53.88 0 0 0 7.06 26.46A54.55 54.55 0 0 0 1715' + 
        	 '644.77M301 539.8c-26.46-15-59.1-6.17-74.09 20.29s-6.17 59.1 20.29 74.09 59.1 6.17 74.09-20.29c15-25.58 6.17-59.1-20.29-74.09m1436 830.88c-7.94' +
        	 '-5.29-17.64-7.06-27.34-7.94a54.69 54.69 0 1 0 0 109.37c19.4 0 37-10.58 47.63-27.34 15-25.58 6.17-59.1-20.29-74.09m-798.25 456c-2.65 24.7 12.35' + 
        	 '48.51 35.28 57.33 5.29 1.76 11.47 3.53 16.76 3.53a57.57 57.57 0 0 0 56.45 -46.75 54.39 54.39 0 0 0 -107.61 -15.88 3.08 3.08 0 0 0 -.88 1.76"/>' +
        	 '<path d="M1790.81,1270.13a143.5,143.5,0,0,0-20.29-9.7V749.73c7.94-2.65,15.88-7.06,23.82-10.58,82-45.87,112-149.95,66.15-232s-149.95-112-232-66.15c' +
        	 '-7.06,3.53-13.23,7.94-19.4,12.35l-449.84-260.2c0.88-7.94,1.76-15,1.76-22.93C1161,75.85,1084.3,0,990.8,0s-172,77.62-172,171.11c0,7.94.88,15,1.76,' +
        	 '22.93L374.25,452.48A170.51,170.51,0,1,0,167,723.27c6.17,4.41,12.35,8.82,19.4,13.23a108.24,108.24,0,0,0,22.93,10.58V1256.9C122,1292.18,79.65,1391,' +
        	 '114.93,1478.29S249,1607.95,336.33,1572.67c7.94-2.65,15-7.06,22.05-10.58,7.06-4.41,14.11-8.82,21.17-14.11l441.9,254.91c-15,92.61,48.51,179.93,141.13,' +
        	 '194.93s179.94-48.51,194.93-141.13c1.76-9.7,1.76-18.52,1.76-28.23a216.83,216.83,0,0,0-1.76-24.7l439.26-253.14c7.06,5.29,14.11,10.58,22.05,15,82,' +
        	 '45.87,186.11,16.76,232-65.27C1894.89,1418.31,1868.43,1317.76,1790.81,1270.13Zm30.87,213.45c-36.16,61.74-116.43,82.91-178.17,46.75-49.39-29.11-74.09' +
        	 '-86.44-60.86-142l-206.4-120.84a230.18,230.18,0,0,1-249.62,52c-30.87,9.7-97,15.88-97,15.88v363.4c72.33,22.05,112,98.79,90,171.11s-98.79,112-171.12,90c' +
        	 '-0.88,0-1.76-.88-2.65-0.88-6.17-1.76-11.47-4.41-16.76-7.06-67.92-33.52-94.38-116.43-60.86-183.46,16.76-33.52,46.75-58.21,82-69.68V1328.34a610.19,610.19' +
        	 ',0,0,1-75.86-29.11,273.82,273.82,0,0,1-225.8-55.57l-246.09,142a131,131,0,1,1-157.89-97c42.34-10.58,87.32,1.76,120,31.75l230.21-133.19c-77.62-109.37-65.27' +
        	 '-259.32,30-354.58l-262-149.95c-52,49.39-134.07,46.75-183.46-6.17a130,130,0,0,1,6.17-184.35c52.92-49.39,134.07-46.75,183.46,6.17,30,31.75,41.46,75.85,' +
        	 '31.75,118.19l290.19,166.7a274.14,274.14,0,0,1,123.49-32.64C855,717.09,959,682.69,959,682.69V285.78c-64.39-19.4-100.55-87.32-81.15-151.71S965.22,34.4,' +
        	 '1029.61,53.8s100.55,87.32,81.15,151.71a120.78,120.78,0,0,1-81.15,81.15v389s190.52,47.63,250.5,119.07l308.71-175.52c-15.88-70.56,27.34-141.13,97.91-157s141.13,27.34,157,97.91-27.34,141.13-97.91,157a131.4,131.4,0,0,1-119.08-32.64L1321.56,857.34c8.82,18.52,16.76,37,22.05,56.45,94.38,64.39,127.9,187.87,77.62,291.07l202,117.31a129,129,0,0,1,153.47-16.76c60.86,36.16,82,115.55,45,178.17h0Z"/><path d="m1252.77 982.59c-.88-7.06-1.76-13.23-2.65-20.29a109.71 109.71 0 0 0 -3.53 -14.11c0-1.76-.88-3.53-.88-5.29-1.76-5.29-3.53-11.47-5.29-16.76v-.88a233.81 233.81 0 0 0 -50.28 -79.38c-5.29-5.29-9.7-9.7-15.88-15l-.88-.88c-5.29-4.41-10.58-8.82-16.76-12.35l-.88-.88c-5.29-3.53-11.47-7.94-16.76-10.58l-.88-.88a164.47 164.47 0 0 0 -17.64 -8.82l-1.76-.88c-6.17-2.65-12.35-5.29-19.4-7.94l-.88-.88c-7.06-1.76-13.23-4.41-20.29-5.29h-.88a176.62 176.62 0 0 0 -21.17 -3.53h-.88a218 218 0 0 0 -111.14 13.23l-4.41 3.53c-5.29 1.76-14.11 6.17-19.4 8.82a41.2 41.2 0 0 1 -8.82 4.41c-2.65.88-7.06 4.41-9.7 6.17s-8.82 6.17-12.35 8.82l-2.65 1.76c-5.29 3.53-9.7 7.94-15 12.35l-4.41 4.41c-5.29 5.29-9.7 9.7-14.11 15a192.84 192.84 0 0 0 -31.75 -2.65c-3.53 0-6.17 0-8.82.88-40.57 1.76-79.38 18.52-109.37 45.87-15 13.23-27.34 30-37 47.63l-.94 1.8a125 125 0 0 0 -7.06 15.88c-.88 1.76-.88 2.65-1.76 4.41a86.7 86.7 0 0 0 -4.41 14.11c-.88 1.76-.88 4.41-1.76 6.17-.88 4.41-1.76 8.82-2.65 14.11 0 1.76-.88 3.53-.88 6.17a156.14 156.14 0 0 0 -.88 20.29 106.75 106.75 0 0 0 .88 16.76c0 1.76.88 3.53.88 6.17.88 3.53.88 7.06 1.76 10.58s.88 4.41 1.76 7.06a25.75 25.75 0 0 1 1.76 7.94c0 2.65 1.76 5.29 2.65 7.94a43 43 0 0 0 2.65 6.17 91.51 91.51 0 0 1 3.53 8.82c.88 1.76 1.76 2.65 1.76 4.41a156 156 0 0 0 60 70.56c13.23 7.94 26.46 15 40.57 19.4a117.51 117.51 0 0 0 16.76 4.41l1.76.88 15.88 2.65 3.53.88c6.17.88 12.35.88 19.4.88 23.82 0 46.75-4.41 67.92-14.11 5.29 3.53 9.7 7.06 15 10.58l1.76.88c4.41 2.65 9.7 5.29 15 7.94h.86a227.42 227.42 0 0 0 163.18 16.76h.88a100.75 100.75 0 0 0 22.93 -7.94l23.82-10.58a129.23 129.23 0 0 0 79.38 27.34c6.17 0 11.47-.88 17.64-.88l4.41-.88a143.32 143.32 0 0 0 16.76 -3.53 117.79 117.79 0 0 0 15.88 -6.17l2.65-.88c5.29-2.65 9.7-5.29 15-7.94 22.05-14.11 38.81-35.28 48.51-59.1 3.53-7.94 5.29-15.88 7.06-23.81v-2.65c.88-3.53.88-7.06 1.76-10.58 0-4.41.88-8.82.88-13.23 0-58.21-36.16-108.49-90-125.25"/></g></svg>',

    _prompStorjDetails: function(callback) {
        const config = {
            icon: 'lock',
            header: 'Storj account',
            body: '<input required class="input-base storage__storj-email" style="width:100%" type="text" />' +  
                  '<input required class="input-base storage__storj-password" style="width:100%" type="password" />',
            buttons: [
                Alerts.buttons.cancel,
                Alerts.buttons.ok
            ]
        };

        const view = new ModalView({ model: config });
        view.render();
        view.on('result', (res, check) => {
            const save = Alerts.buttons.ok.result === res;
            if (save) {
                const email = view.$el.find('.storage__storj-email')[0].value;
                const password = view.$el.find('.storage__storj-password')[0].value;
                this.appSettings.set('storjEmail', email);
                this.appSettings.set('storjPassword', password);
            }

            if (callback) {
                callback(save);
            }
             
            /*storj = new StorjModule({
                bridgeUrl: 'https://api.storj.io',
                bridgeUser: this.appSettings.get('StorjEmail'),
                bridgePass: this.appSettings.get('StorjPassword'),
                encryptionKey: this.appSettings.get('StorjKey'),
                logLevel: 4
            });*/
        });
    },

    load(path, opts, callback) {
        this.logger.debug('Load', path);
        const ts = this.logger.ts();

        // download latest kdbx database
        // TODO:  resolve all database ID's in a bucket
        /*if (!this.appSettings.get('StorjEmail') && !this.appSettings.get('StorjPassword')) {
            // First, get the hash of the directory (Storj call it BUCKET) in our storj account
            const bucketId = storj.getBucketId(this.appSettings.get('StorjBucketName'), function(err, result) {
                             if (err) {     
                                 console.log('Method getBucketId:', result, 'Error:', err);
                                 return callback && callback(err); 
                             }
                         });
            storj.resolveFile(bucketId, this.appSettings.get('StorjFileID'), filePath)
        }
        else {
            this._prompStorjDetails();
            console.log('Method load: cant authenticate', 'Error:', err);
            return callback;
        }*/
        
        
    },

    stat(path, opts, callback) {
        callback('fail');
    },

    save(path, opts, data, callback, rev) {
        this.logger.debug('Save', path, rev);
        const ts = this.logger.ts();
        // First, get the hash of the directory (Storj call it BUCKET) in our storj account
        /*const bucketId = storj.getBucketId(this.appSettings.get('StorjBucketName'), function(err, result) {
				             if (err) {     
				            	 console.log('Method getBucketId:', result, 'Error:', err);
				            	 return callback && callback(err); 
				             }
        				 });
        // Upload the file now
		const state = storj.storeFile(bucketId, path, {
						  filename: path.split('\\').pop().split('/').pop(),
						  progressCallback: function(progress, downloadedBytes, totalBytes) {
						    console.log('progress:', progress);
						  },
						  finishedCallback: function(err, fileId) {
						    if (err) {
				            	 console.log('Method storeFile, file name:', path.split('\\').pop().split('/').pop(), 'file path:', path, 'Error:', err);
				            	 return callback && callback(err); 
						    }

						    this.appSettings.set('StorjFileID', fileId);	
						    return callback && callback(null, {rev: rev});
						  }
					  });*/
    },

    list(dir, callback) {
        this.logger.debug('List');
        const ts = this.logger.ts();
        // First, get the hash of the directory (Storj call it BICKET) in our storj account
        /*var bucketId = storj.getBucketId(this.appSettings.get('StorjBucketName'), function(err, result) {
				            if (err) {     
				            	console.log('Method getBucketId:', result, 'Error:', err);
				            	return callback && callback(err); 
				            }
				       });
        // List all files in the directory (Storj call it BUCKET)
		var bucketFiles = storj.listFiles(bucketId, function(err, result) {
					            if (err) {     
					            	console.log('Method listFiles:', result, 'Error:', err);
					            	return callback && callback(err); 
					            }
					      });

        return callback(null, bucketFiles);*/
    },

    /*remove(path, callback) {
        this.logger.debug('Remove', path);
        const ts = this.logger.ts();
        
    },*/

    setEnabled(enabled) {
        StorageBase.prototype.setEnabled.call(this, enabled);
    }
});

BaseLocale.StorjSync = 'Storj Decenterlized';
Storage.StorjSync = new StorjDecenterlized();

module.exports.getSettings = function() {
    return [{
    	// key and Bucket name are OK to save theme in KeeWeb as text fields
        name: 'StorjKey',
        label: 'Storj encryption key',
        type: 'text',
        placeholder: 'Key used to seed',
        value: this.appSettings.get('StorjKey') ? this.appSettings.get('StorjKey') : ''
    }, {
        name: 'StorjBucketName',
        label: 'Folder name',
        type: 'text',
        placeholder: 'The folder where you store your files',
        value: this.appSettings.get('StorjBucketName') ? this.appSettings.get('StorjBucketName') : ''
    }];
};


module.exports.uninstall = function() {
    delete BaseLocale.StorjSync;
    delete Storage.SaveInStorj;
};