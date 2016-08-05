document.getElementById('submit').onclick = function() {
    validate();
    if (validate()) {
    	makeFlashCards();
    }
};

function findUniq(arg) { //creates list of every word used in input text
    var allWords = arg.toLowerCase()
        .replace(/[".,\/#!$%\^&\*;:{}=\-_`~()]/g,'')
        .replace(/[\u2014\u2013\u0022]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ');
    var uniqueWords = [];
    for (var i = 0, len = allWords.length; i < len; i++) {
        if (uniqueWords.indexOf(allWords[i]) === -1) {
            uniqueWords.push(allWords[i]);
        }
    }

    return findFreq(uniqueWords, allWords);
}

function findFreq(arr, allWords) { //counts times each word is used
    var freqObj = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        var counter = 0;
        for (var j = 0, len2 = allWords.length; j < len2; j++) {
            if (arr[i] === allWords[j]) {
                counter++;
            }
        }
        freqObj[arr[i]] = counter;
    }

    return freqObj;
}

function makeArr(obj) {
    var finalArr = [];
    var numberToShow = parseInt(document.getElementById('numberToShow').value, 10);
    var numberToIgnore = parseInt(document.getElementById('numberToIgnore').value, 10); 
    var max = numberToShow + numberToIgnore; //numberToIgnore added because it will be subtracted back out in ignore function
    for (var prop in obj) { //obj converted to multidimensional arr with frequency info
        if (obj.hasOwnProperty(prop)) {
            finalArr.push([prop, obj[prop]]);
        }
    }

    finalArr.sort(function(a, b) { //2d array sorted by frequency
        return b[1] - a[1];
    });

    var newArr = [];
    for (var i = 0, len = finalArr.length; i < len; i++) { //freq info removed from sorted arr
        finalArr[i].splice(1, 1);
        newArr.push(finalArr[i].toString());
    }

    newArr.splice(max, newArr.length);
    return newArr;
}

function ignore(arr) { //filters out most common english words
    var noCommon = [];
    var numberToShow = parseInt(document.getElementById('numberToShow').value, 10);
    var max = parseInt(document.getElementById('numberToIgnore').value, 10);
    var common = ['the', 'of', 'and', 'a', 'to', 'in', 'is', 'be', 'that',
        'was', 'he', 'for', 'it', 'with', 'as', 'his', 'I', 'on',
        'have', 'at', 'by', 'not', 'they', 'this', 'had', 'are', 'but',
        'from', 'or', 'she', 'an', 'which', 'you', 'one', 'we', 'all',
        'were', 'her', 'would', 'there', 'their', 'will', 'when', 'who',
        'him', 'been', 'has', 'more', 'if', 'no', 'out', 'do', 'so',
        'can', 'what', 'up', 'said', 'about', 'other', 'into', 'than',
        'its', 'time', 'only', 'could', 'new', 'them', 'man', 'some',
        'these', 'then', 'two', 'first', 'May', 'any', 'like', 'now',
        'my', 'such', 'make', 'over', 'our', 'even', 'most', 'me',
        'state', 'after', 'also', 'made', 'many', 'did', 'must',
        'before', 'back', 'see', 'through', 'way', 'where', 'get',
        'much', 'go', 'well', 'your', 'know', 'should', 'down', 'work',
        'year', 'because', 'come', 'people', 'just', 'say', 'each',
        'those', 'take', 'day', 'good', 'how', 'long', 'Mr', 'own',
        'too', 'little', 'use', 'US', 'very', 'great', 'still', 'men',
        'here', 'life', 'both', 'between', 'old', 'under', 'last',
        'never', 'place', 'same', 'another', 'think', 'house', 'while',
        'high', 'right', 'might', 'came', 'off', 'find', 'states',
        'since', 'used', 'give', 'against', 'three', 'himself', 'look',
        'few', 'general', 'hand', 'school', 'part', 'small', 'American',
        'home', 'during', 'number', 'again', 'Mrs', 'around', 'thought',
        'went', 'without', 'however', 'govern', 'dont', 'does', 'got',
        'public', 'United', 'point', 'end', 'become', 'head', 'once',
        'course', 'fact', 'upon', 'need', 'system', 'set', 'every',
        'war', 'put', 'form', 'water', 'took', 'program', 'present',
        'government', 'thing', 'told', 'possible', 'group', 'large',
        'until', 'always', 'city', 'didnt', 'order', 'away', 'called',
        'want', 'eyes', 'something', 'unite', 'going', 'face', 'far',
        'asked', 'interest', 'later', 'show', 'knew', 'though', 'less',
        'night', 'early', 'almost', 'let', 'open', 'enough', 'side',
        'case', 'days', 'yet', 'better', 'nothing', 'tell', 'problem',
        'toward', 'given', 'why', 'national', 'room', 'young', 'social',
        'light', 'business', 'president', 'help', 'power', 'country',
        'next', 'things', 'word', 'looked', 'real', 'John', 'line',
        'second', 'church', 'seem', 'certain', 'big', 'Four', 'felt',
        'several', 'children', 'service', 'feel', 'important', 'rather',
        'name', 'per', 'among', 'often', 'turn', 'development', 'keep',
        'family', 'seemed', 'white', 'company', 'mind', 'members',
        'others', 'within', 'done', 'along', 'turned', 'god', 'sense',
        'week', 'best', 'change', 'kind', 'began', 'child', 'ever',
        'law', 'matter', 'least', 'means', 'question', 'act', 'close',
        'mean', 'leave', 'itself', 'force', 'study', 'York', 'action',
        'its', 'door', 'experience', 'human', 'result', 'times', 'run',
        'different', 'car', 'example', 'hands', 'whole', 'center',
        'although', 'call', 'Five', 'inform', 'gave', 'plan', 'woman',
        'boy', 'feet', 'provide', 'taken', 'thus', 'body', 'play',
        'seen', 'today', 'having', 'cost', 'perhaps', 'field', 'local',
        'really', 'am', 'increase', 'reason', 'themselves', 'clear',
        'Im', 'information', 'figure', 'late', 'above', 'history',
        'love', 'girl', 'held', 'special', 'move', 'person', 'whether',
        'college', 'sure', 'probably', 'either', 'seems', 'cannot',
        'art', 'free', 'across', 'death', 'quite', 'street', 'value',
        'anything', 'making', 'past', 'brought', 'moment', 'control',
        'office', 'heard', 'problems', 'became', 'full', 'near', 'half',
        'nature', 'hold', 'live', 'available', 'known', 'board',
        'effect', 'already', 'Economic', 'money', 'position', 'believe',
        'age', 'together', 'shall', 'TRUE', 'political', 'court',
        'report', 'level', 'rate', 'air', 'pay', 'community',
        'complete', 'music', 'necessary', 'society', 'behind', 'type',
        'read', 'idea', 'wanted', 'land', 'party', 'class', 'organize',
        'return', 'department', 'education', 'following', 'mother',
        'sound', 'ago', 'nation', 'voice', 'six', 'bring', 'wife',
        'common', 'south', 'strong', 'town', 'book', 'students', 'hear',
        'hope', 'able', 'industry', 'stand', 'tax', 'west', 'meet',
        'particular', 'cut', 'short', 'stood', 'university', 'spirit',
        'start', 'total', 'future', 'front', 'low', 'century',
        'Washington', 'usually', 'care', 'recent', 'evidence',
        'further', 'million', 'simple', 'road', 'sometimes', 'support',
        'view', 'fire', 'says', 'hard', 'morning', 'table', 'left',
        'situation', 'try', 'outside', 'lines', 'surface', 'ask',
        'modern', 'top', 'peace', 'personal', 'member', 'minutes',
        'lead', 'schools', 'talk', 'consider', 'gone', 'soon', 'father',
        'ground', 'living', 'months', 'therefore', 'America', 'started',
        'longer', 'Dr', 'dark', 'various', 'finally', 'hour', 'north',
        'third', 'fall', 'greater', 'pressure', 'stage', 'expected',
        'secretary', 'needed', 'Thats', 'kept', 'eye', 'values',
        'union', 'private', 'alone', 'black', 'required', 'space',
        'subject', 'english', 'month', 'understand', 'Ill', 'nor',
        'answer', 'moved', 'amount', 'conditions', 'direct', 'red',
        'student', 'rest', 'nations', 'heart', 'costs', 'record',
        'picture', 'taking', 'couldnt', 'hours', 'deal', 'forces',
        'everything', 'write', 'coming', 'effort', 'market', 'island',
        'wall', 'purpose', 'basis', 'east', 'lost', 'St', 'except',
        'letter', 'looking', 'property', 'Miles', 'difference',
        'entire', 'else', 'color', 'followed', 'feeling', 'son',
        'makes', 'friend', 'basic', 'cold', 'including', 'single',
        'attention', 'note', 'cause', 'hundred', 'step', 'paper',
        'developed', 'tried', 'simply', 'cant', 'story', 'committee',
        'inside', 'reached', 'easy', 'appear', 'include', 'accord',
        'Actually', 'remember', 'beyond', 'dead', 'shown', 'fine',
        'religious', 'continue', 'ten', 'defense', 'getting', 'Central',
        'beginning', 'instead', 'river', 'received', 'doing', 'employ',
        'trade', 'terms', 'trying', 'friends', 'sort', 'administration',
        'higher', 'cent', 'expect', 'food', 'building', 'religion',
        'meeting', 'ready', 'walked', 'follow', 'earth', 'speak',
        'passed', 'foreign', 'NATURAL', 'medical', 'training', 'County',
        'list', 'floor', 'piece', 'especially', 'indeed', 'stop',
        'wasnt', 'England', 'difficult', 'likely', 'Suddenly', 'moral',
        'plant', 'bad', 'club', 'needs', 'international', 'working',
        'countries', 'develop', 'drive', 'reach', 'police', 'sat',
        'charge', 'farm', 'fear', 'test', 'determine', 'hair',
        'results', 'stock', 'trouble', 'happened', 'growth', 'square',
        'William', 'cases', 'effective', 'serve', 'miss', 'involved',
        'doctor', 'earlier', 'increased', 'being', 'blue', 'hall',
        'particularly', 'boys', 'paid', 'sent', 'production',
        'district', 'using', 'thinking', 'concern', 'Christian',
        'press', 'girls', 'wide', 'usual', 'direction', 'feed', 'trial',
        'walk', 'begin', 'weeks', 'points', 'respect', 'certainly',
        'ideas', 'industrial', 'methods', 'operation', 'addition',
        'association', 'combine', 'knowledge', 'decided', 'temperature',
        'statement', 'Yes', 'below', 'game', 'nearly', 'science',
        'directly', 'horse', 'influence', 'size', 'showed', 'build',
        'throughout', 'questions', 'character', 'foot', 'Kennedy',
        'firm', 'reading', 'husband', 'doubt', 'services', 'according',
        'lay', 'stay', 'programs', 'anyone', 'average', 'French',
        'spring', 'former', 'summer', 'bill', 'lot', 'chance', 'due',
        'comes', 'army', 'actual', 'Southern', 'neither', 'relate',
        'rise', 'evening', 'normal', 'wish', 'visit', 'population',
        'remain', 'measure', 'merely', 'arrange', 'condition',
        'decision', 'account', 'opportunity', 'pass', 'demand',
        'strength', 'window', 'active', 'deep', 'degree', 'ran',
        'western', 'E', 'sales', 'continued', 'fight', 'heavy', 'arm',
        'standard', 'generally', 'carry', 'hot', 'provided', 'serious',
        'led', 'wait', 'hotel', 'opened', 'performance', 'maybe',
        'station', 'changes', 'literature', 'marry', 'claim', 'works',
        'bed', 'wrong', 'main', 'unit', 'George', 'hit', 'planning',
        'supply', 'systems', 'add', 'chief', 'officer', 'Soviet',
        'pattern', 'stopped', 'price', 'success', 'lack', 'myself',
        'truth', 'freedom', 'manner', 'quality', 'gun', 'manufacture',
        'clearly', 'share', 'movement', 'length', 'ways', 'burn',
        'forms', 'Organization', 'break', 'somewhat', 'efforts',
        'cover', 'meaning', 'progress', 'treatment', 'beautiful',
        'placed', 'happy', 'attack', 'apparently', 'blood', 'groups',
        'carried', 'sign', 'radio', 'dance', 'Ive', 'regard', 'mans',
        'train', 'herself', 'numbers', 'corner', 'reaction',
        'immediately', 'language', 'running', 'recently', 'shake',
        'larger', 'lower', 'machine', 'attempt', 'learn', 'couple',
        'race', 'audience', 'Oh', 'middle', 'brown', 'date', 'health',
        'persons', 'understanding', 'arms', 'daily', 'suppose',
        'additional', 'hospital', 'pool', 'technical', 'served',
        'declare', 'described', 'current', 'poor', 'steps', 'reported',
        'sun', 'based', 'produce', 'determined', 'receive', 'park',
        'staff', 'faith', 'responsibility', 'Europe', 'latter',
        'British', 'season', 'equal', 'learned', 'practice', 'green',
        'writing', 'ones', 'choice', 'fiscal', 'term', 'watch', 'scene',
        'activity', 'product', 'types', 'ball', 'heat', 'clothe',
        'lived', 'distance', 'parent', 'letters', 'returned', 'forward',
        'obtained', 'offer', 'specific', 'straight', 'fix', 'division',
        'slowly', 'shot', 'poet', 'seven', 'moving', 'mass', 'plane',
        'proper', 'propose', 'drink', 'obviously', 'plans', 'whatever',
        'afternoon', 'figures', 'parts', 'approve', 'saying', 'born',
        'immediate', 'fame', 'gives', 'extent', 'justice', 'cars',
        'mark', 'pretty', 'opinion', 'ahead', 'glass', 'refuse',
        'enter', 'completely', 'send', 'desire', 'judge', 'none',
        'waiting', 'popular', 'Democratic', 'film', 'mouth', 'Corps',
        'importance'
    ];
    common = common.splice(0, max);
    for (var i = 0, len = arr.length; i < len; i++) {
        if (common.indexOf(arr[i]) === -1) {
            noCommon.push(arr[i]);
        }
    }
    
    noCommon.splice(numberToShow, noCommon.length);
    return noCommon;
}

function define(arr) {
	return new Promise(function(resolve, reject) {
    var client = [];
    var definitions = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        (function(i) {
            client[i] = new XMLHttpRequest();
            client[i].onreadystatechange = function() {	
                if (client[i].readyState === 4 && client[i].status === 200) {
                	if (client[i].responseText && JSON.parse(client[i].responseText).length === 0) {
                		let parsedResponse = JSON.parse(client[i].responseText)[0] = [{
                			word: arr[i],
                			text: 'Definition not found',
                			attributionText: ''
                		}];
                        definitions[arr[i]] = parsedResponse;
                	} else {
                        definitions[arr[i]] = JSON.parse(client[i].responseText);
                    }
                    if (Object.keys(definitions).length === arr.length) {
                        resolve(definitions); 
                    } 
                }
            };
            client[i].open('GET', 'http://api.wordnik.com:80/v4/word.json/' + arr[i] +
                '/definitions?limit=1&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
                true);
            client[i].send();
        })(i);
    }
});
}

function validate() {
    var validFields = 0;
    var form = {
        inputText: document.getElementById('inputText'),
        numberToShow: document.getElementById('numberToShow'),
        numberToIgnore: document.getElementById('numberToIgnore'),
    };
    document.getElementById('inputTextPrompt').innerHTML = '';
    document.getElementById('numberToShowPrompt').innerHTML = '';
    document.getElementById('numberToIgnorePrompt').innerHTML = '';
    if (form.inputText.value === '') {
        document.getElementById('inputTextPrompt').innerHTML =
            'Please enter written text';
    } else {
        validFields++;
    }

    if (form.numberToShow.value < 1 || form.numberToShow.value > 20) {
        document.getElementById('numberToShowPrompt').innerHTML =
            'Please enter a number between 1 and 20';
    } else if (!Number.isInteger(Number(form.numberToShow.value))) {
        document.getElementById('numberToShowPrompt').innerHTML =
            'Must be a whole number';
    } else {
        validFields++;
    }

    if (form.numberToIgnore.value === '' || form.numberToIgnore.value < 0 || form.numberToIgnore
        .value > 1000) {
        document.getElementById('numberToIgnorePrompt').innerHTML =
            'Please enter a number between 0 and 1000';
    } else if (!Number.isInteger(Number(form.numberToIgnore.value))) {
        document.getElementById('numberToIgnorePrompt').innerHTML =
            'Must be a whole number';
    } else {
        validFields++;
    }

    if (validFields === 3) {
    	return true;
    } else {
    	return false;
    }
}

function makeFlashCards() {
	var data = document.getElementById('inputText').value;
    var wordsToDefine = ignore(makeArr(findUniq(data)));
    define(wordsToDefine).then(function(result) {
    	success(result);
    }).catch(function() {
    	alert('There has been an error');
    }); 
}

function success(obj) {
	document.getElementById('form').innerHTML = '';
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            addElement('div', obj[prop][0].word);
        } 
    }
    attachDefinition(obj);
}

function addElement(type, word) {
	var newElement = document.createElement(type);
	var content = document.createTextNode(word);
	newElement.appendChild(content);
	var referenceNode = document.getElementById('form');
	document.body.insertBefore(newElement, referenceNode);
	newElement.id = word;
	newElement.className = "flashcards";
}

function attachDefinition(obj) {
	var classArr = document.getElementsByClassName('flashcards');
	for (let i = 0, len = classArr.length; i < len; i++) {
		    classArr[i].addEventListener('click', function() {
		    	cardClicked.call(this, obj);
		    });
	}
}

function cardClicked(obj) {
	var el = document.getElementById(this.id);
	if (obj[this.id].length !== 0) {
	if (this.innerHTML.split(' ').length === 1) {
	    var img = document.createElement('img');
	    img.src = 'https://www.wordnik.com/img/wordnik_badge_a2.png';
        el.innerHTML = obj[this.id][0].text + ' ' + obj[this.id][0].attributionText + '<br>';
        el.style['font-weight'] = 'normal';
        el.style['font-size'] = '16px';
        el.style['text-align'] = 'left';
        el.style.overflow = 'auto';
        el.appendChild(img);
    } else {
    	el.innerHTML = obj[this.id][0].word;
    	el.style['font-weight'] = 'bold';
        el.style['font-size'] = '36px';
        el.style['text-align'] = 'center';
        el.style.overflow = 'visible';
    }
}
}
