/*
 * midifile.js -  Part of the Javascript port of 'Steevs MIDI Library'
 * Version 1.0
 *
 *  AUTHOR: Steven Goodwin (StevenGoodwin@gmail.com)
 *          Copyright 1998-2016, Steven Goodwin.
 *
 *  This program is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public License as
 *  published by the Free Software Foundation; either version 2 of
 *  the License,or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 */

var SML = SML || {};

SML.MidiFile = {};
SML.MidiFile.save = function(midifile, filename) {
	var data = [midifile.getFileAsByteArray()];
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var blob = new Blob(data, {type: "octet/stream"});
    var url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = filename;
    a.click();

    window.URL.revokeObjectURL(url);
}

// Usage:
//     document.body.appendChild(SML.MidiFile.createEmbed(mf));
SML.MidiFile.createEmbed = function(midifile) {
    var data = midifile.getFileAsByteArray();
    var b64encoded = btoa(String.fromCharCode.apply(null, data));
    var e = document.createElement("embed");

    e.autostart = true;
    e.loop = false;
    e.volume = 100;
    e.hidden = false;
    e.src = "data:audio/mid;base64," + b64encoded;

    return e;
}
