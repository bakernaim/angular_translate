import { Injectable } from '@angular/core';
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_AR_NAME, LANG_AR_TRANS } from './lang-ar';

@Injectable()
export class TranslateService {
	private _currentLang: string;

	dictionary = {
		[LANG_EN_NAME]: LANG_EN_TRANS,
		[LANG_AR_NAME]: LANG_AR_TRANS,
	};

	public get currentLang() {
		if(localStorage.getItem('lang'))
			this._currentLang = localStorage.getItem('lang');
		else {
			localStorage.setItem('lang', 'en')
			this._currentLang = localStorage.getItem('lang');
		}
		return this._currentLang;
	}

	public use(lang: string): void {
		localStorage.setItem('lang', lang);
		this._currentLang = lang;

		if (lang === 'en') {
			document.body.setAttribute('dir', 'ltr');
		} else {
			document.body.setAttribute('dir', 'rtl');
		}

	}

	private translate(key: string): string {
		if (this.dictionary[this.currentLang] && this.dictionary[this.currentLang][key]) {
			return this.dictionary[this.currentLang][key];
		}
		return key;
	}

	public instant(key: string) {
		return this.translate(key);
	}
}
