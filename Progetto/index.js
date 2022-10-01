const dotenv = require("dotenv");
const axios = require("axios");
const telegraf = require("telegraf");

dotenv.config({
    path: "./secret.env"
});

const bot = new telegraf.Telegraf(process.env.BOT_TOKEN);

bot.start(async(ctx) => {
    await ctx.reply("Benvenuto nel bot di Angelo Coviello, Tommaso Curti e Daniele D'onofrio");
    await ctx.reply("Digita /help per visualizzare i comandi da poter utilizzare");
})

bot.command("help", async(ctx) => {
    let gatto = "/gatto seguito da un codice HTTP valido per ricevere una foto di un gatto\n\n";
    let pappagallo = "/pappagallo seguito da un messaggio per ricevere tale messaggio come risposta\n\n";
    let emoji = "/emoji seguito da un messaggio per visualizzare l'emoji più adatta\n\n";
    let moneta = "/moneta per lanciare una moneta\n\n";
    let dado = "/dado per lanciare un dado\n\n";
    let orario = "/orario per ricevere un messaggio con l'orario attuale\n\n";
    let data = "/data per ricevere un messaggio con la data odierna";
    await ctx.reply(gatto + pappagallo + emoji + moneta + dado + orario + data);
})

bot.command("gatto", async(ctx) => {
    const args = ctx.message.text.split(" ");
    args.shift();

    let status = args[0];
    
    if(!status)
        status = 404;

    try{
        await ctx.sendPhoto("https://http.cat/" + status);
    }
    catch(err){
        await ctx.reply("Errore... Sei sicuro di aver inserito un codice valido?");
    }
})

bot.command("pappagallo", async(ctx) => {
    const args = ctx.message.text.split(" ");
    args.shift();

    const payload = args.join(" ");
    await ctx.reply(payload);
})

bot.command("data", async(ctx) => {
    const data = new Date();
    let giorno;

    switch(data.getDay()){
        case 1:
            giorno = "lunedì";
            break;
        case 2:
            giorno = "martedì";
            break;
        case 3:
            giorno = "mercoledì";
            break;
        case 4:
            giorno = "giovedì";
            break;
        case 5:
            giorno = "venerdì";
            break;
        case 6:
            giorno = "sabato";
            break;
        case 7:
            giorno = "domenica";
            break;
    }

    await ctx.reply("Oggi è " + giorno + " " + data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear());
})

bot.command("orario", async(ctx) => {
    const data = new Date();
    await ctx.reply("In questo momento sono le " + data.getHours() + ":" + data.getMinutes());
})

bot.command("emoji", async(ctx) => {
    const args = ctx.message.text.split(" ");
    args.shift();

    const payload = args.join(" ");
    
    await ctx.reply(controlloEmoji(payload));
})

function controlloEmoji(payload){
    if(payload.includes("angel"))
        return "😇";
    if(payload.includes("diavol"))
        return "👿";
    if(payload.includes("ciao") || payload.includes("saluta"))
        return "👋";
    if(payload.includes("felic"))
        return "😁";
    if(payload.includes("ride"))
        return "😂";
    if(payload.includes("trist"))
        return "🙁";
    if(payload.includes("mascherina") || payload.includes("covid") || payload.includes("pandemia"))
        return "😷";
    if(payload.includes("drag"))
        return "🐲";
    if(payload.includes("elf"))
        return "🧝";
    if(payload.includes("mag"))
        return "🧙‍♂️";
    if(payload.includes("banan"))
        return "🍌";
    return "🤔";
}

bot.command("moneta", async(ctx) => {
    let value = Math.floor((Math.random() * 2) + 1);

    if(value == 1)
        await ctx.reply("É uscito testa");
    else
        await ctx.reply("É uscito croce");
})

bot.command("dado", async(ctx) => {
    await ctx.reply("É uscito " + Math.floor((Math.random() * 6) + 1));
})

bot.launch();
console.log("bot avviato!");