/*
 * midi.js -  Part of the Javascript port of 'Steevs MIDI Library'
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

SML.Midi = function() {
	var ppqn;
	var tracks;

	(function ctor() {
		ppqn = 120;	// Sonar defaults to this for MIDI files, which is why I do
		tracks = [];
	})();

	function createTrack() {
		var track = new SML.MidiTrack(ppqn);
		tracks.push(track);
		return track;
	}

	function setPPQN(p) {
		ppqn = p;
	}

	function getFileAsByteArray() {
		// Prepare buffer
		var s = new SML.MidiStream();
		

		// Write header
		s.addString('MThd');
		s.addDWord(6);	// header size
		s.addWord(1);	// Version 1, has multiple tracks
		s.addWord(tracks.length);	// number of tracks
		s.addWord(ppqn);

		// Write each track
		for(var i=0;i<tracks.length;++i) {
			tracks[i].generateTrackData(s);
		}

		// Convert to an appropriate buffer
		var saveBuffer = s.getBufferAsArray();
		var typedBuffer = new Uint8Array(saveBuffer.length);
		for(var i=0;i<saveBuffer.length;++i) {
			typedBuffer[i] = saveBuffer[i];
		}
		return typedBuffer;

	}

	return {
		setPPQN: function(p) 	{ return setPPQN(p); },
		createTrack: function() { return createTrack(); },

		getFileAsByteArray: function() { return getFileAsByteArray(); }
	}
}
