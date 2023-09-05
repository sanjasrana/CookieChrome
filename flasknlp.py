from flask import Flask, request, jsonify
import spacy
from spacy.matcher import Matcher
from flask_cors import CORS
nlp = spacy.load("en_core_web_sm")

app = Flask(__name__)
CORS(app) 

@app.route('/process-text', methods=['POST'])
def process_text():
    text = request.json.get('text')
    doc = nlp(text)
    
    matcher = Matcher(nlp.vocab)
    patterns = [
       [{"LOWER": "first"}, {"LOWER": "name"}], [{"LOWER": "last"}, {"LOWER": "name"}], [{"LOWER": "personal"}, {"LOWER": "information"}],
       [{"LOWER": "date"}, {"LOWER": "of"} , {"LOWER": "birth"}], [{"LOWER": "location"}], [{"LOWER": "signature"}], [{"LOWER": "device"}],
       [{"LOWER": "email"}], [{"LOWER": "ip"}],[{"LOWER": "ip"}, {"LOWER": "address"}],
       [{"LOWER": "user"}, {"LOWER": "information"}], [{"LOWER": "personal"}, {"LOWER": "information"}],[{"LOWER": "postal"}, {"LOWER": "information"}],
       [{"LOWER": "social"}, {"LOWER": "media"}], [{"LOWER": "address"}],[{"LOWER": "activity"}], [{"LOWER": "interests"}], [{"LOWER": "visits"}, {"LOWER": "to"}, {"POS": "NOUN", "OP": "*"}, {"POS": "CCONJ", "OP": "?"}, {"POS": "NOUN", "OP": "*"}],
       [{"LOWER": "demographic"}, {"LOWER": "information"}],[{"LOWER": "time"}, {"LOWER": "spent"}]
       ]

    for p in p:
        matcher.add("TERM", [p])

    matches = matcher(doc)

    extracted_terms = [doc[start:end].text for match_id, start, end in matches]
    
    return jsonify({"terms": extracted_terms})

if __name__ == "__main__":
    app.run(debug = True)