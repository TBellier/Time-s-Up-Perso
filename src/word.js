import React from 'react';

const articles = new Set([
    "le",
    "la",
    "un",
    "les",
    "une",
    "du",
    "de",
    "des",
    "l",
    "d",
    "the",
])

function filterEmptyString(elm){
    return (elm !== "");
}

function uniqBy(a) {
    var seen = {};
    return a.filter(function(item) {
        var k = item.key;
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}

class Word {
    
    constructor(string) {
        let list_words = string.split(/[ ]+/).filter(filterEmptyString);
        let first_word = list_words[0];
        let first_word_list = first_word.split(/[']+/);
        let first_word_article = first_word_list[0];
        if (first_word_list.length > 1) {
            this.has_apostrophe = true;
        } else {
            this.has_apostrophe = false;
        }
        if (articles.has(first_word_article.toLowerCase())) {
            this.article = first_word_article.charAt(0).toUpperCase() + first_word_article.slice(1);
            this.has_article = true;
        } else {
            this.article = "";
            this.has_article = false;
        }
        if (this.has_article) {
            if (this.has_apostrophe) {
                list_words[0] = first_word_list.slice(1).join("'");
            } else {
                list_words = list_words.slice(1)
            }
        } else {
            list_words[0] = first_word.charAt(0).toUpperCase() + first_word.slice(1);
        }
        this.name = list_words.join(" ");
      }

    get fullString() {
        if (this.has_article) {
            if (this.has_apostrophe) {
                var result = this.article + "'" + this.name;
            } else {
                var result = this.article + " " + this.name;
            }
        } else {
            var result = this.name;
        }
        return result;
    }

    get key() {
        return this.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }

    toString() {
        return this.fullString
    }

    render() {
        return this.fullString
    }
}

export {Word, uniqBy}