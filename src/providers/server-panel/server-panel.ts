import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServerPanelProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerPanelProvider {

  server_url:string='https://bangturstudio.com/panel/radioelshadday/wp-json/wp/v2/';
  app_cover:string='app_cover';
  server_icecast_url:string = 'link_streaming';

  cover_endpoint:string = this.server_url + this.app_cover
  streaming_endpoint:string = this.server_url+this.server_icecast_url

  constructor(public http: HttpClient) {
    console.log('Hello ServerPanelProvider Provider');
  }

  getCoverUrl() {
    return this.http.get(this.cover_endpoint);
  }

  getIceUrl(){
    return this.http.get(this.streaming_endpoint);    
      
  }

}
