/*
 * Allow you smoothly surf on youkuwebsites blocking non-AD.
 * Copyright (C) 2013 panjun.liu http://176code.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
chrome.webRequest.onBeforeRequest.addListener (
        AdBlock,
        {urls:["http://*.youku.com/*"]},
        ["blocking"]
);

var redirectlist = [
    {
        name:"优酷播放器",
        find:/^http:\/\/static\.youku\.com\/.*?q?(player|loader)(_[^.]+)?\.swf/,
        replace: "http://player.verycloud.cn/youku_player.swf",
    },
];

function AdBlock(obj){
    var url = obj.url;
    for (var i = 0; i < redirectlist.length; i++){
        if (redirectlist[i].find.test(url)) {
            var newUrl=url.replace(redirectlist[i].find,redirectlist[i].replace);
            newUrl = decodeURIComponent(newUrl);
            //console.log(newUrl);
            return {redirectUrl:newUrl};
        }
    }
}
