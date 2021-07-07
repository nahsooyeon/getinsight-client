import apiUtil from "../../commons/apiUtil";
import axios from 'axios';
import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import Logger from "../../commons/Logger";

const naverShopURL = 'https://shopping.naver.com';
const naverViewURL = 'https://naver.com';
/* 브라우저 열기 - 키워드 입력 및 검색 - 스크롤 - 데이터 파싱 - 클라이언트에 전송  */
export const NaverViewCralwer = async (data: string) => {
	let inputValue = '운동화';
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080,
		});
		await page.goto(naverViewURL, { waitUntil: 'domcontentloaded' });
		await page.focus('input[name=query]');
		await page.keyboard.type(inputValue);

		/* 검색 버튼 클릭 */
		await page.waitForTimeout(1000);
		await page.click('button[id=search_btn]');
		console.log('검색시작');
		await page.waitForTimeout(1000);
		/* 첫 페이지 스크롤 */
		await autoScroll(page);
		/* VIEW 더보기 버튼 클릭 */
		const viewMore_btn = await page.$x(
			'//*[@id="main_pack"]/section[2]/div/div[2]/panel-list/div/more-button/div'
		);
		if (viewMore_btn) {
			await page.click('a.api_more');
			await page.waitForTimeout(2000);
			await autoScroll(page);
		}
		const posts = await page.$x(
			'//*[@id="main_pack"]/section/div/div[2]/panel-list/div/more-contents/div/ul/li'
		); // 46
		console.log(posts.length);

		/* 저장된 데이터 개수가 20개 미만이고 다음 버튼이 있을 경우  */
		// if (datas.length < 20) {
		// 	const parseData = async () => {
		// 		/* 포스팅 그룹 변수 선언 */
		// 		const posts = await page.$x(
		// 			'//*[@id="main_pack"]/section/div/div[2]/panel-list/div/more-contents/div/ul/li'
		// 		); // 46
		// 		console.log(posts.length)
		// 		console.log('상품정보 파싱을 시작합니다');
		// 		for (let i = 0; i < posts.length; i++) {
		// 			const data: { [key in string]: any } = {};
		// 			/* 포스트 요소 한 개에 들어가야하는 정보: 포스트 제목, 채널, 작성자, 작성일자 */
		// 			/*  한 개 정보를 받아오는 함수 반복실행 */
		// 			const title = await posts[i].$('div.total_wrap > div.total_area > a.api_txt_lines');
		// 			const channel = await posts[i].$(
		// 				'');
		// 			const writer = await posts[i].$(
		// 				'');
		// 			const date = await posts[i].$(
		// 				'');
		// 			const influencer = await posts[i].$('');
		// 			const ad = await posts[i].$('');

		// 			data.title = await page.evaluate((el) => {
		// 				const text: string = el.textContent;
		// 				return text;
		// 			}, title);

		// 			data.channel = await page.evaluate((el) => {
		// 				const text: string = el.textContent;
		// 				return text;
		// 			}, channel);

		// 			data.writer = await page.evaluate((el) => {
		// 				const text: string = el.textContent;
		// 				return text;
		// 			}, writer);

		// 			data.date = await page.evaluate((el) => {
		// 				const text: string = el.textContent;
		// 				return text;
		// 			}, date);


		// 			datas.push(data);
		// 		}
		// 		return datas;
		// 	};

		// }



		/* 페이지 닫기 */
		await page.close();
	}
	catch (error) {
		Logger.error(error);
	}
};

export const NaverShopCrawler = async (data: string) => {
	let inputValue = data;
	try {
		/* 크롬 브라우저 열기 */
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080,
		});
		await page.goto(naverShopURL, { waitUntil: 'domcontentloaded' });
		/* 요청으로 받은 키워드 입력하기 */
		await page.focus('input[name=query]');
		await page.keyboard.type(inputValue);

		/* 검색 버튼 클릭 */
		await page.waitForTimeout(1000);
		await page.click('a[_clickcode=search]');
		await page.waitForTimeout(1000);
		/* 첫 페이지 스크롤 */
		await autoScroll(page);
		let pageCount = 1;
		const datas = [];


		/* 상품 리스트 파싱 */
		const parseData = async () => {
			const products = await page.$x(
				'//*[@id="__next"]/div/div[2]/div[2]/div[3]/div[1]/ul/div/div/li/div/div[2]'
			); // 46
			console.log('상품정보 파싱을 시작합니다');
			for (let i = 0; i < products.length; i++) {
				const data: { [key in string]: any } = {};
				/* 상품 한 개 정보를 받아오는 함수 반복실행 */
				const title = await products[i].$('div.basicList_title__3P9Q7 > a');
				const price = await products[i].$(
					'div.basicList_price_area__1UXXR > strong > span > span.price_num__2WUXn'
				);
				const review = await products[i].$(
					'div.basicList_etc_box__1Jzg6 > a > em'
				);
				const like = await products[i].$(
					'div.basicList_etc_box__1Jzg6 > span.basicList_etc__2uAYO > button > span > em'
				);

				data.title = await page.evaluate((el) => {
					const text: string = el.textContent;
					return text.replace(/(\t|\n|\s)+/g, '');
				}, title);

				data.price = await page.evaluate((el) => {
					const text: string = el.textContent;
					return text;
				}, price);

				data.review = await page.evaluate((el) => {
					const text: string = el.textContent;
					return text;
				}, review);

				data.like = await page.evaluate((el) => {
					const text: string = el.textContent;
					return text;
				}, like);
				datas.push(data);
			}
			return datas;
		};

		await parseData();





	} catch (error) {
		Logger.error(error);
	}
};





/* 페이지 끝까지 스크롤하기 */

const autoScroll = async (page: puppeteer.Page) => {
	await page.evaluate(async () => {
		await new Promise<void>((resolve, reject) => {
			let totalHeight = 0;
			let distance = 100;
			let timer = setInterval(() => {
				let scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;
				if (totalHeight >= scrollHeight) {
					clearInterval(timer);
					resolve();
				}
			}, 100);
		});
	});
};

/* 검색 버튼 클릭 */

/* 첫 페이지 스크롤 */

/* 상품 리스트 파싱 */

/* 브라우저 종료 */