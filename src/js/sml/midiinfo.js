/*
 * midiinfo.js -  Part of the Javascript port of 'Steevs MIDI Library'
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

SML.MidiNote = {};
SML.MidiNote.dotted_minim = [3,1];
SML.MidiNote.dotted_crochet = [3,2];
SML.MidiNote.dotted_quaver = [3,4];
SML.MidiNote.dotted_semiquaver = [3,8];
SML.MidiNote.dotted_semidemiquaver = [3,16];
SML.MidiNote.breve = [4, 1];
SML.MidiNote.minim = [2,1];
SML.MidiNote.crochet = [1, 1];
SML.MidiNote.quaver = [1, 2];
SML.MidiNote.semiquaver = [1, 4];
SML.MidiNote.semidemiquaver = [1, 8];


SML.MidiMessage = {};
SML.MidiMessage.NoteOff = 0x80;		/* [ pitch, volume ] */
SML.MidiMessage.NoteOn = 0x90;		/* [ pitch, volume ] */
SML.MidiMessage.NoteKeyPressure = 0xa0;		/* [ pitch, pressure (after touch) ] */
SML.MidiMessage.SetParameter = 0xb0;		/* [ param number (CC), setting ] */
SML.MidiMessage.SetProgram = 0xc0;		/* [ program ] */
SML.MidiMessage.ChangePressure = 0xd0;		/* [ pressure (after touch) ] */
SML.MidiMessage.SetPitchWheel = 0xe0;		/* [ LSB,  MSG (two 7 bit values) ] */

SML.MidiMessage.MetaEvent = 0xff;
SML.MidiMessage.SysEx1 = 0xf0;
SML.MidiMessage.SysEx2 = 0xf7;

SML.MidiMessage.PatchChange = SML.MidiMessage.SetProgram;
SML.MidiMessage.ControlChange = SML.MidiMessage.SetParameter;

SML.MidiMessage.SysMask = 0xf0;


//
// Meta events
//
SML.MidiMeta = {};
// Text information
SML.MidiMeta.SequenceNumber		= 0x00;		/* followed by 2 and then the sequence number */
SML.MidiMeta.TextEvent			= 0x01;
SML.MidiMeta.Copyright			= 0x02;
SML.MidiMeta.TrackName			= 0x03;
SML.MidiMeta.Instrument			= 0x04;
SML.MidiMeta.Lyric				= 0x05;
SML.MidiMeta.Marker				= 0x06;
SML.MidiMeta.CuePoint			= 0x07;
// Data
SML.MidiMeta.MIDIPort			= 0x21;		/* followed by 1, then the port number */
SML.MidiMeta.EndSequence		= 0x2f;		/* followed by zero */
SML.MidiMeta.SetTempo			= 0x51;		/* followed by 3 (size), and time between beats in us: us = 60000000/tempo. Write as three bytes, MSG first */
SML.MidiMeta.SMPTEOffset		= 0x54;		/* followed by 5 (size), and 5 bytes detailing frame info:	hr.mins.sec:frame.ff */
SML.MidiMeta.TimeSignature		= 0x58;		/* followed by 4 (size), and 4 bytes detailing  nominator and denominator of sig,clock_in_metro_tick and notated_32nds_in_quarter */
SML.MidiMeta.KeySignature		= 0x59;		/* followed by 2 (size), and the key (-7=7 flats, 0=key of C,7=7 sharps)), followed by a 'major?' flag (0=major, 1=minor) */
// Custom
SML.MidiMeta.SequencerSpecific	= 0x7f;		/* followed by the number of bytes, then the data */


//
// Text events
//
SML.MidiText = {};

SML.MidiText.TextEvent			= 1;
SML.MidiText.Copyright			= 2;
SML.MidiText.TrackName			= 3;
SML.MidiText.Instrument			= 4;
SML.MidiText.Lyric				= 5;
SML.MidiText.Marker				= 6;
SML.MidiText.CuePoint			= 7;


//
// Key signatures
//
SML.MidiKeySignature = {};

SML.MidiKeySignature.CFlatMaj			= 0x87;
SML.MidiKeySignature.GFlatMaj			= 0x86;
SML.MidiKeySignature.DFlatMaj			= 0x85;
SML.MidiKeySignature.AFlatMaj			= 0x84;
SML.MidiKeySignature.EFlatMaj			= 0x83;
SML.MidiKeySignature.BFlatMaj			= 0x82;
SML.MidiKeySignature.FMaj				= 0x81;
SML.MidiKeySignature.CMaj				= 0x00;
SML.MidiKeySignature.GMaj				= 0x01;
SML.MidiKeySignature.DMaj				= 0x02;
SML.MidiKeySignature.AMaj				= 0x03;
SML.MidiKeySignature.EMaj				= 0x04;
SML.MidiKeySignature.BMaj				= 0x05;
SML.MidiKeySignature.FSharpMaj			= 0x06;
SML.MidiKeySignature.CSharpMaj			= 0x07;
SML.MidiKeySignature.CFlatMin			= 0xc7;
SML.MidiKeySignature.GFlatMin			= 0xc6;
SML.MidiKeySignature.DFlatMin			= 0xc5;
SML.MidiKeySignature.AFlatMin			= 0xc4;
SML.MidiKeySignature.EFlatMin			= 0xc3;
SML.MidiKeySignature.BFlatMin			= 0xc2;
SML.MidiKeySignature.FMin				= 0xc1;
SML.MidiKeySignature.CMin				= 0x40;
SML.MidiKeySignature.GMin				= 0x41;
SML.MidiKeySignature.DMin				= 0x42;
SML.MidiKeySignature.AMin				= 0x43;
SML.MidiKeySignature.EMin				= 0x44;
SML.MidiKeySignature.BMin				= 0x45;
SML.MidiKeySignature.FSharpMin			= 0x46;
SML.MidiKeySignature.CSharpMin			= 0x47;
/* Format: Bit 7=represent as negative; Bit 6=Minor SML.MidiKeySignature.; bits 0-3=SML.MidiKeySignature. id*/
/* By no coincidence; masking out the 'minor' flag;we have a signed char value */
SML.MidiKeySignature.MaskNeg			= 0x80;
SML.MidiKeySignature.MaskFlatKeys		= 0x80;
SML.MidiKeySignature.MaskMin			= 0x40;
SML.MidiKeySignature.MaskKey			= 0x07;
