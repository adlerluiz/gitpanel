import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gitmoji'
})
export class GitmojiPipe implements PipeTransform {

  gitmojis: any = {
    art: 'π¨',
    zap: 'β‘',
    fire: 'π₯',
    bug: 'π',
    ambulance: 'π',
    sparkles: 'β¨',
    memo: 'π',
    rocket: 'π',
    lipstick: 'π',
    tada: 'π',
    white_check_mark: 'β',
    lock: 'π',
    apple: 'π',
    penguin: 'π§',
    checkered_flag: 'π',
    robot: 'π€',
    green_apple: 'π',
    bookmark: 'π',
    rotating_light: 'π¨',
    construction: 'π§',
    green_heart: 'π',
    arrow_down: 'β¬',
    arrow_up: 'β¬',
    pushpin: 'π',
    construction_worker: 'π·',
    chart_with_upwards_trend: 'π',
    recycle: 'β»',
    heavy_minus_sign: 'β',
    whale: 'π³',
    heavy_plus_sign: 'β',
    wrench: 'π§',
    globe_with_meridians: 'π',
    pencil2: 'β',
    hankey: 'π©',
    rewind: 'βͺ',
    twisted_rightwards_arrows: 'π',
    package: 'π¦',
    alien: 'π½',
    truck: 'π',
    page_facing_up: 'π',
    boom: 'π₯',
    bento: 'π±',
    ok_hand: 'π',
    wheelchair: 'βΏ',
    bulb: 'π‘',
    beers: 'π»',
    speech_balloon: 'π¬',
    card_file_box: 'π',
    loud_sound: 'π',
    mute: 'π',
    busts_in_silhouette: 'π₯',
    children_crossing: 'πΈ',
    building_construction: 'π',
    iphone: 'π±',
    clown_face: 'π€‘',
    egg: 'π₯',
    see_no_evil: 'π',
    camera_flash: 'πΈ',
    alembic: 'β',
    mag: 'π',
    wheel_of_dharma: 'βΈοΈ',
    label: 'π·οΈ',
    seedling: 'π±',
    triangular_flag_on_post: 'π©',
    goal_net: 'π₯',
    dizzy: 'π«',
    wastebasket: 'π'
  };

  pattSearch: any = /\:(\w+)\:/gmi;

  transform ( value: any, args?: any ): any {

    while ( !!this.pattSearch.exec( value ) ) {
      this.pattSearch.exec( value );

      const matched = this.pattSearch.exec( value );

      if (matched) {
        value = value.replace( matched[0], (this.gitmojis[ matched[1] ]) ? this.gitmojis[ matched[1] ] : `:${matched[1]}:` );
      } else {
        value = '';
      }
    }
    
    return value;
  }

}
