// NOTE: This is a simplified example, and not expected to work.
// I have 99.9% migrated from this C++ library to its JavaScript equivalent

MIDI_FILE *mf = midiFileCreate(FILEPATH"b1-bpb.mid", TRUE);
int nte[] = {
	MIDI_NOTE_C4+1, MIDI_NOTE_C4+4, MIDI_NOTE_C4+8, MIDI_NOTE_C4+10,
};

for(int chn=0;chn<32;chn++) {
	midiFileSyncTracks(mf, 0, chn);

	for(int l=0;l<=chn;l++) {
		t = (MIDI_NOTE_BREVE*(l))/(chn+1);

		if (chn)
			midiTrackIncTime(mf, 32-chn, t-lt, TRUE);

		midiTrackAddNote(mf, 32-chn, nte[chn%4]+(chn/12)*12, MIDI_NOTE_SEMIQUAVER, vol, FALSE, FALSE);

		if (chn==0)
			midiTrackIncTime(mf, chn, MIDI_NOTE_BREVE, TRUE);
		}

		lt = t;
	}
}

midiFileClose(mf);
