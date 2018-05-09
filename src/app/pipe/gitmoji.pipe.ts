import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gitmoji'
})
export class GitmojiPipe implements PipeTransform {

  gitmojis: any = {
    art: '🎨',
    zap: '⚡',
    fire: '🔥',
    bug: '🐛',
    ambulance: '🚑',
    sparkles: '✨',
    memo: '📝',
    rocket: '🚀',
    lipstick: '💄',
    tada: '🎉',
    white_check_mark: '✅',
    lock: '🔒',
    apple: '🍎',
    penguin: '🐧',
    checkered_flag: '🏁',
    robot: '🤖',
    green_apple: '🍏',
    bookmark: '🔖',
    rotating_light: '🚨',
    construction: '🚧',
    green_heart: '💚',
    arrow_down: '⬇',
    arrow_up: '⬆',
    pushpin: '📌',
    construction_worker: '👷',
    chart_with_upwards_trend: '📈',
    recycle: '♻',
    heavy_minus_sign: '➖',
    whale: '🐳',
    heavy_plus_sign: '➕',
    wrench: '🔧',
    globe_with_meridians: '🌐',
    pencil2: '✏',
    hankey: '💩',
    rewind: '⏪',
    twisted_rightwards_arrows: '🔀',
    package: '📦',
    alien: '👽',
    truck: '🚚',
    page_facing_up: '📄',
    boom: '💥',
    bento: '🍱',
    ok_hand: '👌',
    wheelchair: '♿',
    bulb: '💡',
    beers: '🍻',
    speech_balloon: '💬',
    card_file_box: '🗃',
    loud_sound: '🔊',
    mute: '🔇',
    busts_in_silhouette: '👥',
    children_crossing: '🚸',
    building_construction: '🏗',
    iphone: '📱',
    clown_face: '🤡',
    egg: '🥚',
    see_no_evil: '🙈',
    camera_flash: '📸'
  };

  pattSearch: any = /\:(\w+)\:/gmi;

  transform ( value: any, args?: any ): any {

    while ( !!this.pattSearch.exec( value ) ) {
      this.pattSearch.exec( value );

      const matched = this.pattSearch.exec( value );
      value = value.replace( matched[0] , this.gitmojis[ matched[1] ] );
    }

    return value;

    /*for ( const gitmoji in this.gitmojis ) {
      value = value.replace( ':' + gitmoji + ':' , this.gitmojis[ gitmoji ] );
    }

    return value;*/
  }

}
