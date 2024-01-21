/*
 * midistream.js -  Part of the Javascript port of 'Steevs MIDI Library'
 * Version 1.0
 *
 *  AUTHOR: Steven Goodwin (StevenGoodwin@gmail.com)
 *			Copyright 1998-2016, Steven Goodwin.
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

SML.MidiStream = function() {
var data;

	(function ctor() {
		data = [];
	})();

	function addString(s) {
		for(var i=0;i<s.length;++i) {
			addByte(s.charCodeAt(i));
		}
	}

	function addByte(b) {
		data.push(b);
	}

	function addWord(w) {
		data.push(w >> 16);
		data.push(w & 0xff);
	}

	function addDWord(d) {
		data.push((d >> 24) & 0xff);
		data.push((d >> 16) & 0xff);
		data.push((d >> 8) & 0xff);
		data.push((d >> 0) & 0xff);
	}

	function addArray(a) {
		for(var i=0;i<a.length;++i) {
			data.push(a[i]);
		}
	}

	function addStream(s) {
		addArray(s.getBufferAsArray());
	}
	
	function addVariableLength(n) {
	var buffer;
	var value = n;

		buffer = value & 0x7f;
		while ((value >>= 7) > 0) {
			buffer <<= 8;
			buffer |= 0x80;
			buffer += (value & 0x7f);
		}
		//
		while (true) {
			data.push(buffer & 0xff);
			if (buffer & 0x80) {
				buffer >>= 8;
			} else {
				break;
			}
		}		
	}

	return {
		addString: function(v) { return addString(v); },
		addByte: function(v) { return addByte(v); },
		addWord: function(v) { return addWord(v); },
		addDWord: function(v) { return addDWord(v); },
		addStream: function(v) { return addStream(v); },
		addArray: function(v) { return addArray(v); },
		addVariableLength: function(v) { return addVariableLength(v); },

		getBufferLength: function() { return data.length; },

		getBufferAsArray: function() { return data; }
	}
};

