"use client";

import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

export default function DataForm() {
  const [characters, setCharacters] = useState<string[]>([]);
  const [characterInput, setCharacterInput] = useState("");
  const [img, setImg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    mainCharacter: "",
    genre: "",
    writer: "",
    illustrator: "",
    summary: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAddCharacter = () => {
    if (characterInput.trim() !== "") {
      setCharacters([...characters, characterInput.trim()]);
      setCharacterInput("");
    }
  };

  const handleRemoveCharacter = (index: number) => {
    setCharacters(characters.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      characters,
      img,
    };

    try {
      await addDoc(collection(db, "picturebooks"), data);
      alert("データが正常に登録されました！");
      // フォームをリセット
      setFormData({
        title: "",
        mainCharacter: "",
        genre: "",
        writer: "",
        illustrator: "",
        summary: "",
      });
      setCharacters([]);
      setImg("");
    } catch (error) {
      console.error("データ登録中にエラーが発生しました:", error);
      alert("データ登録中にエラーが発生しました。");
    }
  };
  return (
    <main className="w-full h-dvh flex flex-col items-center justify-center">
      <h1 className="mt-[4dvh] text-2xl font-semibold">
        えほんポケット/絵本データ入力
      </h1>
      <p className="mb-8 text-sm">
        ※わからない場合は"不明"や"わからない"と書いてください
      </p>
      <form className="flex flex-col gap-4">
        <div className="w-[90dvw] h-[72dvh] overflow-y-scroll flex flex-col gap-6">
          {/* タイトル */}
          <div className="w-full flex justify-between items-center gap-2">
            <label htmlFor="text" className="text-base font-medium">
              タイトル
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className="w-2/3 text-base p-2 rounded"
              placeholder="例:桃太郎"
            />
          </div>
          {/* 主人公 */}
          <div className="w-full flex justify-between items-center gap-2">
            <label htmlFor="text" className="text-base font-medium">
              主人公
            </label>
            <input
              id="mainCharacter"
              type="text"
              value={formData.mainCharacter}
              onChange={handleInputChange}
              className="w-2/3  text-base p-2 rounded"
              placeholder="例:桃太郎"
            />
          </div>
          {/* その他登場人物 */}
          <div className="w-full flex justify-between items-center gap-2">
            <label htmlFor="characters" className="text-base font-medium">
              その他登場人物
            </label>
            <div className="w-2/3">
              <div className="flex gap-2">
                <input
                  id="characters"
                  type="text"
                  value={characterInput}
                  onChange={(e) => setCharacterInput(e.target.value)}
                  className="w-1/2 text-base p-2 rounded"
                  placeholder="例:犬"
                />
                <button
                  type="button"
                  onClick={handleAddCharacter}
                  className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
                >
                  追加
                </button>
              </div>
              <ul className="mt-2">
                {characters.map((character, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b py-1"
                  >
                    {character}
                    <button
                      type="button"
                      onClick={() => handleRemoveCharacter(index)}
                      className="text-red-500 hover:underline"
                    >
                      削除
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* ジャンル */}
          <div className="w-full flex justify-between items-center gap-2">
            <label htmlFor="genre" className="text-base font-medium">
              ジャンル
            </label>
            <input
              id="genre"
              type="text"
              value={formData.genre}
              onChange={handleInputChange}
              className="w-2/3 text-base p-2 rounded"
              placeholder="例:昔話"
            />
          </div>
          {/* カテゴリー */}
          <div className="w-full flex justify-between items-center gap-2">
            <label htmlFor="category" className="text-base font-medium">
              カテゴリー
            </label>
            <div className="w-2/3 flex flex-col gap-y-4">
              <div className="flex gap-4 text-base p-2 rounded">
                <p className="w-[14dvw] border-r pr-4">Q1：絵本のタイプ</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex justify-center items-center gap-1">
                    {/* type_story */}
                    <input type="radio" name="type" id="type_story" />
                    <label htmlFor="type_story">シンプルな物語</label>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {/* type_shape */}
                    <input type="radio" name="type" id="type_shape" />
                    <label htmlFor="type_shape">えほんの形が特殊</label>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {/* type_maze */}
                    <input type="radio" name="type" id="type_maze" />
                    <label htmlFor="type_maze">迷路の絵本</label>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {/* type_puzzle */}
                    <input type="radio" name="type" id="type_puzzle" />
                    <label htmlFor="type_puzzle">間違い探し</label>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {/* type_cloth */}
                    <input type="radio" name="type" id="type_cloth" />
                    <label htmlFor="type_cloth">布で作られた絵本</label>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {/* type_trick */}
                    <input type="radio" name="type" id="type_trick" />
                    <label htmlFor="type_trick">仕掛け絵本</label>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {/* type_other */}
                    <input type="radio" name="type" id="type_other" />
                    <label htmlFor="type_other">その他</label>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 text-base p-2 rounded">
                <p className="w-[14dvw] border-r pr-4">
                  Q2：日本作品?海外作品?
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex justify-center items-center gap-1">
                    {/* location_japan */}
                    <input type="radio" name="location" id="location_japan" />
                    <label htmlFor="location_japan">日本</label>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {/* location_abroad */}
                    <input type="radio" name="location" id="location_abroad" />
                    <label htmlFor="location_abroad">海外</label>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 text-base p-2 rounded">
                <p className="w-[14dvw] border-r pr-4">Q3：主人公の分類は?</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex justify-center items-center gap-1">
                    {/* main_human */}
                    <input type="radio" name="main_character" id="main_human" />
                    <label htmlFor="main_human">人間</label>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {/* main_animal */}
                    <input
                      type="radio"
                      name="main_character"
                      id="main_animal"
                    />
                    <label htmlFor="main_animal">陸の動物</label>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {/* main_sea */}
                    <input type="radio" name="main_character" id="main_sea" />
                    <label htmlFor="main_sea">海の動物</label>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {/* main_sky */}
                    <input type="radio" name="main_character" id="main_sky" />
                    <label htmlFor="main_sky">空の動物</label>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {/* main_insect */}
                    <input
                      type="radio"
                      name="main_character"
                      id="main_insect"
                    />
                    <label htmlFor="main_insect">昆虫</label>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {/* main_plant */}
                    <input type="radio" name="main_character" id="main_plant" />
                    <label htmlFor="main_plant">植物</label>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {/* main_other */}
                    <input type="radio" name="main_character" id="main_other" />
                    <label htmlFor="main_other">その他</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 国 */}
          <div className="w-full flex justify-between items-center gap-2">
            <label htmlFor="text" className="text-base font-medium">
              国
            </label>
            <div className="w-2/3 flex flex-wrap gap-4">
              <div className="flex justify-center items-center gap-1">
                <input type="radio" name="location" id="japan" />
                <label htmlFor="japan">日本</label>
              </div>
              <div className="flex justify-center items-center gap-1">
                <input type="radio" name="location" id="abroad" />
                <label htmlFor="abroad">海外</label>
              </div>
            </div>
          </div>
          {/* 作者 */}
          <div className="w-full flex justify-between items-center gap-2">
            <label htmlFor="writer" className="text-base font-medium">
              作者
            </label>
            <input
              id="writer"
              type="text"
              value={formData.writer}
              onChange={handleInputChange}
              className="w-2/3 text-base p-2 rounded"
              placeholder="例:不明"
            />
          </div>
          {/* 絵 */}
          <div className="w-full flex justify-between items-center gap-2">
            <label htmlFor="illustrator" className="text-base font-medium">
              絵
            </label>
            <input
              id="illustrator"
              type="text"
              value={formData.illustrator}
              onChange={handleInputChange}
              className="w-2/3 text-base p-2 rounded"
              placeholder="例:不明"
            />
          </div>
          {/* あらすじ */}
          <div className="w-full flex justify-between items-center gap-2">
            <label htmlFor="summary" className="text-base font-medium">
              あらすじ
            </label>
            <textarea
              id="summary"
              className="w-2/3 h-[16dvh] text-base p-2 rounded"
              placeholder="例:おばあさんが川で洗濯をしていると、大きな桃が流れてきました。
            桃をもちかえって切ろうとしたら、なんと桃からかわいい男の子が生まれました。
            「桃太郎」と名付けられた男の子は、どんどん大きくなり、立派に成長します。
            そんなある日、桃太郎は鬼が島の鬼が悪事をはたらいていると聞き、鬼退治にでかけることに！！"
              value={formData.summary}
              onChange={handleInputChange}
              rows={4}
            ></textarea>
          </div>
          {/* 画像 */}
          <div className="w-full flex justify-between gap-2">
            <label htmlFor="img" className="text-base font-medium">
              画像のファイル名
            </label>
            <div className="w-2/3 flex justify-between items-center">
              <input
                id="img"
                type="text"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                className="w-3/5 text-base p-2 rounded"
                placeholder="例:momotaro.jpg"
              />
              <p className="text-sm">ファイルパス: /img/{img || "{img}"}</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-60 mt-4 mb-[4dvh] m-auto px-4 py-2 rounded-lg text-white font-bold bg-[#755D52] hover:bg-[#EB476D]"
        >
          登録
        </button>
      </form>
    </main>
  );
}
