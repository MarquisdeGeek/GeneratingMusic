/*
 * miditrack.js -  Part of the Javascript port of 'Steevs MIDI Library'
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

SML.MidiTrack = function(ppqn_) {
var eventList;
var timeReference;
var lastTimeReference;
var ppqn;

	(function ctor(ppqn_) {
		eventList = [];
		timeReference = lastTimeReference = 0;
		ppqn = ppqn_;
	})(ppqn_);

	function generateTrackData(s) {
		// 1. Compute all the track data first. (so we know its length)
		var trackStream = new SML.MidiStream();
	
		for(var i=0;i<eventList.length;++i) {
			trackStream.addVariableLength(eventList[i].dt);
			trackStream.addArray(eventList[i].data);
		}
		
		// 2. Then write into the real stream
		s.addString('MTrk');
		s.addDWord(trackStream.getBufferLength());
		s.addStream(trackStream);

	}

	function getRealDuration(duration) {
		if (!duration) {	// for undefined, and 0 length
			return 0;
		}
		//
		var realDuration = ppqn;

		realDuration *= duration[0];
		realDuration /= duration[1];

		return realDuration;
	}

	function addEventData(data) {
		eventList.push({dt:timeReference-lastTimeReference, data:data });
		lastTimeReference = timeReference;
	}

	function addNoteOn(channel, note, volume, duration) {
		
		// Don't auto-increment if duration isn't specified.
		// (This is for advanced features.)
		if (duration) {
			addEventData([SML.MidiMessage.NoteOn | channel, note, volume]);
			timeReference += getRealDuration(duration);
			addEventData([SML.MidiMessage.NoteOff | channel, note, 0]);	

		} else {
			addEventData([SML.MidiMessage.NoteOn | channel, note, volume]);		
		}
	}

	function addNoteOff(channel, note) {
		addEventData([SML.MidiMessage.NoteOff | channel, note, 0]);	
	}

	function addRest(duration) {
		timeReference += getRealDuration(duration);
	}

	function	addSimpleTimeSignature(upper, lower) {
		return addTimeSignature(upper, lower, 24, 8);
	}

	function	addTimeSignature(upper, lower, iClockInMetroTick, iNotated32nds) {
		var data = [ SML.MidiMessage.MetaEvent, SML.MidiMeta.TimeSignature, 0x04, 0,0,0,0];
		var MIDI_NOTE_MINIM = 384*2;

		data[3] = upper;
		data[4] = (MIDI_NOTE_MINIM/lower);
		data[5] = iClockInMetroTick;
		data[6] = iNotated32nds;

		addEventData(data);
	}

	function addTempo(bpm) {
		var data = [ SML.MidiMessage.MetaEvent, SML.MidiMeta.SetTempo, 0x03, 0,0,0];
		var us = 60000000/bpm;

		data[3] = (us>>16)&0xff;
		data[4] = (us>>8)&0xff;
		data[5] = (us>>0)&0xff;

		addEventData(data);
	}

	function addKeySignature(key) {
		var data = [ SML.MidiMessage.MetaEvent, SML.MidiMeta.KeySignature, 0x02, 0,0];

		data[3] = (key&SML.MidiKeySignature.MaskKey)*((key&SML.MidiKeySignature.MaskNeg)?-1:1);
		data[4] = (key&SML.MidiKeySignature.MaskMin)?1:0;

		addEventData(data);
	}

	function addEndSequence() {
		var data = [ SML.MidiMessage.MetaEvent, SML.MidiMeta.EndSequence, 0 ];

		addEventData(data);
	}

	function addText(type, textString) {
		var data = [ SML.MidiMessage.MetaEvent, type ];
		var tempStream = new SML.MidiStream();

		tempStream.addVariableLength(textString);
		tempStream.addString(textString);

		var stringAsArray = tempStream.getBufferAsArray();

		data = data.concat(stringAsArray);

		addEventData(data);
	}

	function addSetKeyPressure(note, aftertouch) {
		addEventData([ SML.MidiMessage.NoteKeyPressure, note, aftertouch ]);
	}

	function addControlChange(type, param) {
		addEventData([ SML.MidiMessage.SetParameter, type, param ]);
	}

	function addProgramChange(instrumentPatch) {
		addEventData([ SML.MidiMessage.SetProgram, instrumentPatch, 0 ]);
	}

	function addChangeKeyPressure(deltaPressure) {
		addEventData([ SML.MidiMessage.ChangePressure, deltaPressure&0x7f, 0 ]);
	}

	function addSetPitchWheel(pitchWheel) {
		var wheel = pitchWheel + 8192;
		addEventData([ SML.MidiMessage.ChangePressure, wheel&0x7f, (wheel>>7)&0x7f ]);
	}



	return {
		addNoteOn: 				function(channel, note, volume, duration) { return addNoteOn(channel, note, volume, duration); },
		addNoteOff: 			function(channel, note) { return addNoteOff(channel, note); },
		addSetKeyPressure: 		function(note, aftertouch) { return addSetKeyPressure(note, aftertouch); },
		addControlChange: 		function(type, param) { return addControlChange(type, param); },
		addProgramChange: 		function(instrumentPatch) { return addProgramChange(instrumentPatch); },
		addChangeKeyPressure: 	function(deltaPressure) { return addChangeKeyPressure(deltaPressure); },
		addSetPitchWheel: 		function(pitchWheel) { return addSetPitchWheel(pitchWheel); },
		addRest: 				function(duration) { return addRest(duration); },

		addTempo: 				function(bpm) { return addTempo(bpm); },
		addKeySignature: 		function(key) { return addKeySignature(key); },
		addSimpleTimeSignature: function(upper, lower) { return addSimpleTimeSignature(upper, lower); },
		addTimeSignature: 		function(upper, lower, iClockInMetroTick, iNotated32nds) { return addTimeSignature(upper, lower, iClockInMetroTick, iNotated32nds); },
		addEndSequence: 		function() { return addEndSequence(); },
		addText: 				function(type, textString) { return addText(type, textString); },


		generateTrackData: 		function(buffer) { return generateTrackData(buffer); }
	}
}
