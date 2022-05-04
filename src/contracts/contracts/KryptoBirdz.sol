// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract KryptoBirdz is ERC721Connector {
    
    string[] public kryptoBirdz;
    mapping(string => bool) _kryptoBirdzExist;
    
    constructor() ERC721Connector('KryptoBirdz', 'KBZ') {
    }

    function mint(string memory _kryptoBird) public {

        require(!_kryptoBirdzExist[_kryptoBird], 'KryptoBirdz: krypto_bird_already_exist');

        // uint256 _id = kryptoBirdz.push(_kryptoBird);
        kryptoBirdz.push(_kryptoBird);
        uint256 _id = kryptoBirdz.length -1;
        _mint(msg.sender, _id);
        _kryptoBirdzExist[_kryptoBird] = true;
    }
}