Slim Object Hash
=========

Generates hashes from objects

Slim than `object-hash`
34.7 KB vs 769 B

Faster than `object-hash`
![jsperf-object-hash-comparison](https://i.imgur.com/tOLd26P.png)

## Installation

  `yarn add slim-object-hash`

## Usage

    import slimObjectHash from 'slim-object-hash'

    const objHash = slimObjectHash({ a: 'a', b: 'b', c: 'c' })
	const objHash2 = slimObjectHash({ c: 'c', b: 'b', a: 'a' })
	
	console.log(objHash) // 2061408781
	console.log(objHash === objHash2) // true
  

## Tests

  `yarn test`
