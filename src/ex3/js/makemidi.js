let primeList = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997
];

function initExample() {
    initUI();
}

function start() {
    generatePrime3("prime-3a.mid");
}

function generatePrime3(filename) {
    let mf = new SML.Midi();
    let tracks = [];
    let keyOffset = 36 - 3;
    let nextPrime = 0;
    let totalPrimes = 32;
    let noteLists = [
        [0, 2, 5, 7, 9, 10, 12],
        [0, 2, 3, 5, 7, 9, 10, 12],
        [12, 8, 11, 7, 5, 3, 0],
        [12, 11, 8, 5, 3, 2, 0],
    ];

    for (let i = 0; i < 4; ++i) {
        tracks[i] = {
            trk: mf.createTrack(),
            offset: 0,
            noteIndex: 0,
            volume: 100 + i * 3,
            noteList: noteLists[i].map((n) => n + i * 12)
        };
    }

    for (let i = 0; i < totalPrimes; ++i) {
        let nextTrackOffset = Number.MAX_VALUE;
        let track;
        for (let t = 0; t < tracks.length; ++t) {
            if (tracks[t].offset < nextTrackOffset) {
                nextTrackOffset = tracks[t].offset;
                track = tracks[t];
            }
        }
        //
        let nextDuration = primeList[nextPrime++];
        let duration = Object.assign({}, SML.MidiNote.crochet);
        duration[0] *= nextDuration;

        track.offset += nextDuration;
        track.trk.addNoteOn(0, keyOffset + track.noteList[track.noteIndex % track.noteList.length], track.volume, duration);
        //
        ++track.noteIndex;
    }

    SML.MidiFile.save(mf, filename);
}
