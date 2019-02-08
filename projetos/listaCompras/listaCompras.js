const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

let lista = [];

const criarBotoes = () => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`)),
        {columns: 3}
    )
)


bot.start(async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${name}`)
    await ctx.reply('Escreva os itens que você quer adicionar ..')
})


bot.on('text', ctx => {
    let message = ctx.update.message.text;
    lista.push(message)
    ctx.reply(`${message} adicionado ...`, criarBotoes())
})

bot.action(/delete (.+)/, async ctx => {
    let itemSelecionado = ctx.match[1];
    lista = lista.filter(item => item !== itemSelecionado)
    await ctx.reply(`${itemSelecionado} deletado da lista`, criarBotoes())
    
    if(lista.length == 0) ctx.reply(`Você não possui nenhum item na lista 😕`)
})


bot.startPolling();