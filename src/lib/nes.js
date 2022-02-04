const HEADER_SIZE = 16;
const TRAINER_SIZE = 512;
const PLAYCHOICE_SIZE = 8192;
const PRGROM_UNIT = 16384;
const CHRROM_UNIT = 8192;

exports.getRomData = function getRomData(rom) {
	const data = { header: {} };

	// "NES\r" constant header string
	if (!rom || (!(rom[0] === 0x4E &&
		rom[1] === 0x45 &&
		rom[2] === 0x53 &&
		rom[3] === 0x1A))) {
		throw 'invalid ROM, failed header constant check';
	}

	// assign values from header flags
	// https://wiki.nesdev.org/w/index.php/INES
	Object.assign(data.header, {
		prgrom: rom[4],
		chrrom: rom[5],
		mapperLow: (rom[6] & 0xF0) >> 4,
		ignoreMirror: !!(rom[6] & 0x8 >> 3),
		hasTrainer: !!(rom[6] & 0x4 >> 2),
		hasBatteryPrgRam: !!(rom[6] & 0x2 >> 1),
		mirroring: (rom[6] & 0x1) === 1 ? 'vertical' : 'horizontal',
		mapperHigh: (rom[7] & 0xF0) >> 4,
		isNes2: (rom[7] & 0xC >> 2) == 2,
		isPlayChoice: !!(rom[7] & 0x2 >> 1),
		isVsUnisystem: !!(rom[7] & 0x1)
	});

	data.trainer = {
		size: data.header.hasTrainer ? TRAINER_SIZE : 0,
		pos: HEADER_SIZE
	};

	data.prgrom = {
		size: PRGROM_UNIT * data.header.prgrom,
		pos: HEADER_SIZE + data.trainer.size
	};

	data.chrrom = {
		size: CHRROM_UNIT * data.header.chrrom,
		pos: data.prgrom.pos + data.prgrom.size
	};

	data.playchioce = {
		size: data.header.isPlayChoice ? PLAYCHOICE_SIZE : 0,
		pos: data.chrrom.pos + data.chrrom.size
	};

	return data;
}