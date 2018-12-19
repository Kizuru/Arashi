const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            runIn: ['text'],
            cooldown: 3,
            aliases: ['next', 'sk'],
			description: language => language.get('COMMAND_SKIP_DESCRIPTION'),
            usage: ''
		});
    }

    async run(message, [...args]) {
        const sQueue = this.client.queues.get(message.guild.id);

        if (!sQueue) return message.sendLocale('MUSIC_NOT_PLAYING');

        if (!sQueue.voice.members.get(message.author.id)) return message.sendLocale('COMMAND_SKIP_NOVOICE', [sQueue.voice.name]);

        await sQueue.connection.dispatcher.end();
        return message.sendLocale('COMMAND_SKIP_SUCCESS', [sQueue.songs[sQueue.songID].title, message.author.tag]);
    }
}