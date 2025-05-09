import requests
from bs4 import BeautifulSoup
import subprocess
import json
# import os

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

def fetch_weapon(url,weapon):
    try:
        response = requests.get(url,headers=headers)
        response.encoding = 'utf-8'  # 设置编码为 UTF-8
        soup = BeautifulSoup(response.text, 'html.parser')
        tables = soup.find_all("table")  # 找到所有表格
        for table in tables:
            rows = table.find_all("tr")  # 找到所有行
            found = False
            weapon_row = None
            for row in rows:
                tds = row.find_all("td")
                for td in enumerate(tds):
                    if weapon in td[1].text:
                        weapon_row = row
                        found = True
                        break
            if found:
                thead = table.find("thead")
                thead_string = thead.prettify()
                weapon_string = weapon_row.prettify()
                thead_string = thead_string.replace("\n", "")
                weapon_string = weapon_string.replace("\n", "")
                # if no type data
                if weapon_row.contents[0].text == weapon:
                    weapon_string = weapon_string.replace("<tr>", "<tr><td></td>", 1)
                html = "<table>"+thead_string+weapon_string+"</table>" 
                return html
        # when weapon==random
        return "<table><td>"+weapon+"</td></table>" 
    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
        return None
    except Exception as e:
        print(f"Error parsing data: {e}")
        return None

def main():
    url = "https://wikiwiki.jp/splatoon3mix/%E3%82%B5%E3%83%BC%E3%83%A2%E3%83%B3%E3%83%A9%E3%83%B3/%E3%83%90%E3%82%A4%E3%83%88%E5%B0%82%E7%94%A8%E3%83%96%E3%82%AD%E3%81%AE%E8%A3%9C%E6%AD%A3"
    result = subprocess.run(["node", "splt.js"], stdout=subprocess.PIPE, text=True, encoding="utf-8")
    if not result.stdout.strip():
        print("No output from splt.js. Exiting...")
        return
    res = json.loads(result.stdout)
    html = "<head><meta charset=\"UTF-8\"><style>table{border-collapse: collapse;border: 1px solid black;margin:10px;}td, th {border: 1px solid black;}</style></head>"
    for weapon in res['weapons']:
        h = fetch_weapon(url,weapon)
        if h is None:
            return
        html+=h
    html += "<p>"+ res['stage']+' - '+ res['boss']+"</p>"
    html += "<p>"+ res['time']+"</p>"
    with open("salmonRun.html", "w", encoding="utf-8") as file:
        file.write(html)
    subprocess.run(["node", "capture.js"])

if __name__ == "__main__":
    main()