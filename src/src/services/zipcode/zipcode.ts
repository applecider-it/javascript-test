import axios from 'axios';

/** Zipcloud API のレスポンス型定義 */
interface ZipcloudResult {
  /** 都道府県 */
  address1: string;
  /** 市区町村 */
  address2: string;
  /** 町域 */
  address3: string;

  kana1: string;
  kana2: string;
  kana3: string;

  prefcode: string;
  zipcode: string;
}

interface ZipcloudResponse {
  message: string | null;
  results: ZipcloudResult[] | null;
  status: number;
}

/** 戻り値の型（成功時と失敗時の判別可能なユニオン型） */
type ZipSearchResult =
  | { success: true; data: ZipcloudResult }
  | { success: false; message: string };

/** 入力された郵便番号文字列の整形（全角半角変換・ハイフン除去・空白除去） */
export const sanitizeZipCode = (rawZip: string): string => {
  return rawZip
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0),
    )
    .replace(/-/g, '')
    .trim();
};

/** 郵便番号から住所情報を取得する */
export const fetchAddressByZip = async (
  zipcode: string,
): Promise<ZipSearchResult> => {
  if (zipcode.length !== 7) {
    return {
      success: false,
      message: '7桁の郵便番号を正しく入力してください。',
    };
  }

  try {
    const response = await axios.get<ZipcloudResponse>(
      'https://zipcloud.ibsnet.co.jp/api/search',
      {
        params: { zipcode },
      },
    );

    const results = response.data.results;

    if (!results || results.length === 0) {
      return {
        success: false,
        message: '該当する住所が見つかりませんでした。',
      };
    }

    const data = results[0] as ZipcloudResult;
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: '通信エラーが発生しました。',
    };
  }
};
